const express = require('express');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex()
const app = express();
const port = 3000; //Because Iron-Man
const pokemonRouter = require("./routers/pokemonRouter")
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.use("/pokemon", pokemonRouter)

// app.get('/pokemon', function(req, res) {
// 	P.getPokemonByName("eevee")
// 	.then((result) => {
// 		res.send({'name': result.name, 
// 			'height':result.height, 
// 			'weight':result.weight, 
// 			'types':result.types, 
// 			'abilities':result.abilities,
// 			'front_pic':result.sprites['front_default'],
// 			'back_pic': result.sprites['back_default']
// 		})
// 	})
// res.end()
// });

// P.getPokemonByName("PokemonName")
