// Require module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientController = require('./controllers/client.controller.js');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Connection base de donnée
mongoose.connect('mongodb://user:user12@ds225543.mlab.com:25543/data-projet2',  { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    //console.log('Database connected');
  }
});

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Quel est le nom du client auquel vous voulez vider les notes ?", function(answer) {

  let files = fs.readdirSync("./notes/" +answer);
  for (var i = 0; i < files.length; i++) {
    fs.unlinkSync('./notes/'+ answer + '/' + files[i]);
  }

  fs.rmdirSync('./notes/' + answer + '/');
  console.log(`Note du client ${answer} supprimer`);
  rl.close();
});


// Port du serveur
const port = 3000;

app.listen(port, () => {
  //console.log(`Server on (port : ${port})`);
});
