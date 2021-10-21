const express = require('express');
const router = express.Router();
router.use(express.json())

const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex()

router.get('/get/:id', async (request, response) => {
    const {id} = request.params
    const pokemonInfo = await getPokemonInfo(id)
    response.send(pokemonInfo)
})
router.get('/', async (request, response) => {
    console.log(request.body)
    // response.send("test")
    const pokemonInfo = await getPokemonInfo(request.body.name)
    response.send(pokemonInfo)
})

async function getPokemonInfo(id){
    const result = await P.getPokemonByName(id)
    return {
        'name': result.name, 
        'height':result.height, 
        'weight':result.weight, 
        'types':result.types, 
        'abilities':result.abilities,
        'front_pic':result.sprites['front_default'],
        'back_pic': result.sprites['back_default']
    }
}

module.exports = router

// {'name': result.name, 
//                 'height':result.height, 
//                 'weight':result.weight, 
//                 'types':result.types, 
//                 'abilities':result.abilities,
//                 'front_pic':result.sprites['front_default'],
//                 'back_pic': result.sprites['back_default']
//             }