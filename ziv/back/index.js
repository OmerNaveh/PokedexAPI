const express = require('express');
const app = express();
const port = 3000; //developer Port
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonRouter =require('./routers/pokemonRouter')
const userRouter = require('./routers/userRouter')
const errorHandler = require('./middleware/errorHandler');
const userHandler = require('./middleware/userHandler');
// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.use(userHandler)
app.use('/pokemon',pokemonRouter);
app.use('/info', userRouter);
app.use(errorHandler)

