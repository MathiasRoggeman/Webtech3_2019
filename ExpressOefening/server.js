const express = require('express')
const app = express()
var path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
var date = Date.now();
var db;


MongoClient.connect('mongodb://localhost:27017/examen', { useNewUrlParser: true },
 (err, database) => {
    if (err) return console.log(err)
    db = database.db('examen')
 
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port 4000')
    })
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// To resolve CORS error :
// https://medium.com/@ahsan.ayaz/how-to-handle-cors-in-an-angular2-and-node-express-applications-eb3de412abef
// url van het angular project dat gaat communiceren met de mongoDb
var originsWhitelist = ['http://localhost:4200'];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials: true
};

//whitelist optie initialiseren in de applicatie
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})


app.get('/list', (req, res) => {
    db.collection('inhaal').find().toArray((err, result) => {
      if (err) throw err
      res.json(result)
    })
  })


app.post('/add', (req, res) => {

    db.collection('inhaal').insertOne(req.body, (err, result) => {
       if (err) throw err
       res.sendFile(path.join(__dirname + '/views/index.html'));
    })
  })

app.post('/search', (req, res) => {
    var query = {naam: req.body.naam}
    db.collection('inhaal').find(query).toArray(function(err, result) {
      if (err) throw err
      if (result == '')
          res.json({})
      else
          res.json(result[0])
    });
   })