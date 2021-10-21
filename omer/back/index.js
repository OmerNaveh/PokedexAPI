const express = require('express');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex()
const app = express();
const port = 3000; //Because Iron-Man

// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
	P.getPokemonByName("eevee")
	.then((result) => {
		res.send({'name': result.name, 
			'height':result.height, 
			'weight':result.weight, 
			'types':result.types, 
			'sprites': result.sprites, 
			'abilities':result.abilities
		})
	})
	// res.end()
});

// P.getPokemonByName("PokemonName")
