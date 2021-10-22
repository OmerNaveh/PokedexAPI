const express = require('express');
const router = express.Router();
router.use(express.json())
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs=require('fs') 

router.get('/get/:id', async function(request, response) { //get request by id
    const {id} = request.params;
    const pokeData = await returnPokeData(id);
    response.send(pokeData)
})
router.get('/', async function(request, response) {  //get request by name
    const body =request.body
    const pokeData = await returnPokeData(body.name);
    response.send(pokeData)
})
const returnPokeData= async (id)=>{ //return needed pokemon data function
    const result = await P.getPokemonByName(id);
    return {
        'name': result.name ,
        'height':result.height, 
        'weight':result.weight, 
        'types':result.types,'species':result.species , 
        'front_pic':result.sprites['front_default'],
        'back_pic': result.sprites['back_default'], 
        'abilities':result.abilities}
}
router.put('/catch/:id', (request,response)=>{ //put request --catching pokemon
    const id=request.params.id;
    const body=request.body;
    if(fs.existsSync(`./users/${id}`)){
        if(fs.existsSync(`./users/${id}/${body.pokemon.id}.json`)){
            response.status(403).send('Pokemon already caught')
        }
        fs.writeFileSync(`./users/${id}/${body.pokemon.id}.json`,JSON.stringify(body.pokemon)) //make pokemon json file
    }
    else{
        fs.mkdirSync(`./users/${id}`) //make user file
        fs.writeFileSync(`./users/${id}/${body.pokemon.id}.json`,JSON.stringify(body.pokemon)) //make pokemon json file
        } 
    response.send('pokemon caught')
}
)

  module.exports = router