const express = require('express');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex()
const app = express();
const port = 3000; //Because Iron-Man
const pokemonRouter = require("./routers/pokemonRouter")
const userRouter = require('./routers/userRouter')
const errorHandler = require('./middleware/errorHandler');
const userHandler = require('./middleware/userHandler');
const cors = require('cors')


// start the server
app.listen(port, function() {
  console.log('app started');
});


app.use(cors()) // solves chrome issue
// route our app
app.use(userHandler)
app.use("/pokemon", pokemonRouter)
app.use('/info', userRouter)
app.use(errorHandler)
