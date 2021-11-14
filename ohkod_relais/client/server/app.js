const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/api', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res, next) => {
  console.log('demande du client en JSON : ', req.body);
  var Gpio = require('onoff').Gpio; //importation de la librairie onoff et on inter réagit avec le port GPIO      
  var LED = new Gpio(20, 'out'); //On instancie un objet qui va utiliser la broche du processeur qui se nomme GPIO4

  function changeRL(position) {
    LED.writeSync(position); //set pin state to 1 (turn LED on)
  }

  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;