const CommentModel = require('./comment');
const PostModel = require('../post/post');

const createComment = async ({ content, createdBy, postId }) => {
  const existedPost = await PostModel.findById(postId);

  if (!existedPost) throw new Error('Not found post');
  
  const newComment = await CommentModel.create({
    content,
    createdBy,
    post: postId
  });
  return newComment;
}

const getComments = async (postId) => {
  const comments = await CommentModel.find({ post: postId })
    .populate('createdBy', 'email')
    .populate('post', 'title');

  // b1: tạo ref từ schema
  // b2: populate dùng trong find()
  return comments;
}

module.exports = {
  createComment,
  getComments
}