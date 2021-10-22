const fs = require('fs')
const express = require('express');
const router = express.Router();
router.use(express.json())

const Pokedex = require('pokedex-promise-v2');
const { userInfo } = require('os');
const { json } = require('express');
const P = new Pokedex()

router.get('/get/:id', async (request, response) => {
    const {id} = request.params
    const pokemonInfo = await getPokemonInfo(id)
    response.send(pokemonInfo)
})
router.get('/', async (request, response) => {
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

router.put('/catch/:id', async (request, response) => {
    const username = request.params.id
    const pokemonObj = request.body.pokemon
    console.log(fs.existsSync(`../users/${username}`))
    if (fs.existsSync(`./users/${username}`)) {
        if (fs.existsSync(`./users/${username}/${pokemonObj.id}.json`)) {
            response.status(403).send('pokemon already been caught')
        }
        fs.writeFileSync(`./users/${username}/${pokemonObj.id}.json`, JSON.stringify(pokemonObj))
    } else {
        fs.mkdirSync(`./users/${username}`) // create user dir
        fs.writeFileSync(`./users/${username}/${pokemonObj.id}.json`, JSON.stringify(pokemonObj)) //create pokemon json
    }
    response.send('caught pokemon')
})

module.exports = router

// {'name': result.name, 
//                 'height':result.height, 
//                 'weight':result.weight, 
//                 'types':result.types, 
//                 'abilities':result.abilities,
//                 'front_pic':result.sprites['front_default'],
//                 'back_pic': result.sprites['back_default']
//             }