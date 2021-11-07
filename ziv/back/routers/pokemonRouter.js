const express = require('express');
const router = express.Router();
router.use(express.json())
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs=require('fs') 

router.get('/get/:id', async function(request, response, next) { //get request by id
    try {
        const {id} = request.params;
        const pokeData = await returnPokeData(id);
        response.send(pokeData)
    } catch (error) {
        next(error);
    }
})
// router.get('/', async function(request, response, next) {  //get request by name
//     try {
//         const body =request.body
//         const pokeData = await returnPokeData(body.name);
//         response.send(pokeData)
//     } catch (error) {
//         next(error);
//     }
// })
const returnPokeData= async (id)=>{ //return needed pokemon data function    
    const result = await P.getPokemonByName(id);
    return {
        'id': result.id,
        'name': result.name ,
        'height':result.height, 
        'weight':result.weight, 
        'types':result.types,
        'species':result.species , 
        'front_pic':result.sprites['front_default'],
        'back_pic': result.sprites['back_default'], 
        'abilities':result.abilities,
        'stats': result.stats
    }
}

router.put('/catch/:id', async (request,response,next)=>{ //put request --catching pokemon
    try {
        const id=request.params.id;
        const username=request.headers.username;
        const pokeData = await returnPokeData(id)
        if(fs.existsSync(`./users/${username}`)){
            if(fs.existsSync(`./users/${username}/${id}.json`)){
               throw ({'message':"403"});
            }
            fs.writeFileSync(`./users/${username}/${id}.json`,JSON.stringify(pokeData)) //make pokemon json file
        }
        else{
            fs.mkdirSync(`./users/${username}`) //make user file
            fs.writeFileSync(`./users/${username}/${id}.json`,JSON.stringify(pokeData)) //make pokemon json file
            } 
        response.send('pokemon caught')
        
    } catch (error) {
        next(error);
    }
})
router.delete('/release/:id', (request,response,next)=>{ //delete request --- release pokemon
    try {
        const id=request.params.id;
        const username=request.headers.username;
        if(fs.existsSync(`./users/${username}`)){
            if(!fs.existsSync(`./users/${username}/${id}.json`)){}
            else{
                fs.unlinkSync(`./users/${username}/${id}.json`)
                return response.send('Pokemon was released to the wild!')
            }
        }
        throw ({'message':"403"});
    } catch (error) {
        next(error);
    }
})

router.get('/' ,(request,response,next)=>{ //get request --- returns all pokemon caught by user
    try {
        const username=request.headers.username;
        if(fs.existsSync(`./users/${username}`)){
            const pokeFiles = fs.readdirSync(`./users/${username}`);
            const dataArr = [];
            for(let file of pokeFiles){
                const data = JSON.parse(fs.readFileSync(`./users/${username}/${file}`))
                dataArr.push(data);
            }
            return response.send(JSON.stringify(dataArr))
        }else {
            throw({'message':"401"})}
    } catch (error) {
        next(error);
    }
})
  module.exports = router