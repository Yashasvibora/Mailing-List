var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var faker = require('faker');
var mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'join_us'
});

connection.connect();

app.get('/', function(req, res) {
  const q = 'SELECT COUNT(*) AS total FROM users';
  connection.query(q, function(err, results) {
    if (err) throw err;
    const total = results[0].total;
    // res.send(`There are ${total} users in our database`);
    res.render('home', { total });
  });
});

app.post('/register', function(req,res){
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 res.redirect("/");
 });
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=> {
 console.log('App listening on port 8080!');
});
