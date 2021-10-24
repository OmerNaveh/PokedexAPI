const express = require('express');
const app = express();
const port = 8080; //developer Port
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonRouter =require('./routers/pokemonRouter')
const userRouter = require('./routers/userRouter')
const errorHandler = require('./middleware/errorHandler');
const userHandler = require('./middleware/userHandler');
const cors = require('cors')

// start the server
app.listen(port, function() {
  console.log('app started');
});

app.use(cors())

// app.use((req, res, next) => { // chrome only work with this headers !
//   res.append('Access-Control-Allow-Origin', '*');
//   res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.append('Access-Control-Allow-Headers', 'username, Content-Type, X-Auth-Token, Origin, Authorization');
//   next();
// });

// route our app
app.use(userHandler)
app.use('/pokemon',pokemonRouter);
app.use('/info', userRouter);
app.use(errorHandler)

