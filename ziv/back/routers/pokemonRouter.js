const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
router.use(express.json())

router.get('/get/:id', async function(request, response) {
    const {id} = request.params;
    const pokeData = await returnPokeData(id);
    response.send(pokeData)
})
router.get('/', function(request, response) {
    const body =request.body
    const pokeData = await returnPokeData(body.name);
    response.send(pokeData)
})
const returnPokeData= async (id)=>{
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
  module.exports = router