const express = require('express');
const cors = require('cors')
const userRouter = require('./users/userRouter');
const server = express();
server.use(express.json());
server.use(cors());
server.use(logger)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
server.use('/api/users', userRouter);
//custom middleware

  function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} `
    );
  
    next();
  };


module.exports = server;
