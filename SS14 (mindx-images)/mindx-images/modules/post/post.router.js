const express = require('express');
const Router = express.Router();
const isAuth = require('../../middlewares/isAuth');

const postController = require('./post.controller');

// api/posts/
// get phân trang bài viết
Router.get('/', async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    const numberPage = Number(page) || 1;
    const numberPageSize = Number(pageSize) || 4;

    const offset = (numberPage - 1) * numberPageSize;
    const limit = numberPageSize;

    const [data, total] = await postController.getPosts({ offset, limit });

    res.send({ success: 1, data: { data, total } });
  } catch (err) {
    res.status(500).send({ success: 0, message: err.message });
  }
});

Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postController.getDetailPost(id);
    res.send({ success: 1, data: post });
  } catch (err) {
    res.status(500).send({ success: 0, message: err.message });
  }
})

// api/posts
// tạo bài viêt
// check token o trong header co hop le hay ko
Router.post(
  '/',
  isAuth,
  async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;

      // req.user co duoc khi chay qua thang middleware
      const createdBy = req.user._id;

      // check du lieu client gui len
      const newPost = await postController.createPost({
        title,
        description,
        imageUrl,
        createdBy
      });

      res.send({ success: 1, data: newPost });
    } catch (err) {
      res.status(500).send({ success: 0, message: err.message });
    }
  }
);

module.exports = Router;