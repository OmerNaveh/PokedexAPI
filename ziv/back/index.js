const express = require('express');
const app = express();
const port = 3000; //developer Port
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
//P.getPokemonByName//info about pokemon
//P.getTypeByName //get data about specific type
// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  P.getPokemonByName('1')
  .then(function (result){
  res.send({'name': result.name , 'height':result.height, 'weight':result.weight, 'types':result.types, 'sprites': result.sprites, 'abilities':result.abilities})
})
});
