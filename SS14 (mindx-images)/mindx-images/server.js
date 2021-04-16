const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // tránh lỗi cross origin resource sharing
require('dotenv').config();


const AuthRouter = require('./modules/auth/auth.router');
const PostRouter = require('./modules/post/post.router');
const CommentRouter = require('./modules/comment/comment.router');

const logger = require('./middlewares/logger');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log('Mongo err', err);

  console.log('MongoDB connected');
});

const app = express();
app.use(cors())
app.use(express.json());
// middleware => parse du lieu tu client => gan no vao trong req.body
// req.body mới có data

app.use('*', logger);

// global middleware
app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
// middleware
app.use('/api/comments', CommentRouter);

app.use('*', (req, res) => res.status(404).send({ success: 0, message: '404 not found' }))

app.listen(process.env.PORT, (err) => {
  if (err) return console.log('Start error', err);

  console.log('Server started');
})