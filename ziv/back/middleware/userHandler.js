

function userHandler(req,res,next){
if(req.headers.username){
    next();
}
else{
    next({message:401});
}
}
module.exports = userHandler;