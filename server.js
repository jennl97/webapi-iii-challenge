const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const helmet = require('helmet');
const morgan = require('morgan');



const server = express();

server.use(express.json());

//routes
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

//middleware
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

//let's go code!
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
};

module.exports = server;
