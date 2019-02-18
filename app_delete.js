// Require module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientController = require('./controllers/client.controller.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Connection base de donnée
mongoose.connect('mongodb://user:user12@ds225543.mlab.com:25543/data-projet2',  { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Database connected');
  }
});

// Affichage du formulaire pr création user
app.get('/', (req, res) => {
  res.sendFile( __dirname  + '/data/deleteUser.html');
});

// Recupère donnée du form et on appelle le controlleur
app.post('/', clientController.deleteUser);

// Port du serveur
const port = 3000;

app.listen(port, () => {
  console.log(`Server on (port : ${port})`);
});
