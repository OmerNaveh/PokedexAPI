const express = require('express');
const app = express();
const port = 3000; //developer Port
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonRouter =require('./routers/pokemonRouter')

// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.use('/pokemon',pokemonRouter);
// app.get('/', function(req, res) {
//   P.getPokemonByName('1')
//   .then(function (result){
//   res.send({'name': result.name , 'height':result.height, 'weight':result.weight, 'types':result.types,'species':result.species , 'front_pic':result.sprites['front_default'],'back_pic': result.sprites['back_default'], 'abilities':result.abilities})
// })
// });
