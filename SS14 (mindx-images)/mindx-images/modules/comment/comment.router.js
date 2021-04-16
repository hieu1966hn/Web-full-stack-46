const express = require('express');
const Router = express.Router();
const commentController = require('./comment.controller');
const isAuth = require('../../middlewares/isAuth');
// api/comments/posts/:postId
// Get tất cả các comment có thông tin email của người tạo, và title, _id của bài viết
Router.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentController.getComments(postId);

    res.send({ success: 1, data: comments })
  } catch (err) { 
    res.status(500).send({ success: 0, message: err.message})

  }
});
// api/comments
Router.post('/', isAuth, async (req, res) => {
  try {
    const { content, postId } = req.body;
    const createdBy = req.user._id;

    const newComment = await commentController.createComment({
      content,
      postId,
      createdBy
    });

    res.send({ success: 1, data: newComment });
  } catch (err) {
    res.status(500).send({ success: 0, message: err.message})
  }
});

module.exports = Router;