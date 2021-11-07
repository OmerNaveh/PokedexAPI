

function errorhandler(err,req,res,next){
    if(err.message){
        err.message = `${err.message}`
        if(err.message.includes('404')){
            res.status(404).send('pokemon not found!')
        }
        if(err.message.includes('403')){
            res.status(403).send('releasing an uncaught pokemon, or catching an already caught pokemon')
        }
        if(err.message.includes('401')){
            res.status(401).send('unauthenticated user request')
        } 
    }else res.status(500).send('server errors');
}


module.exports= errorhandler;