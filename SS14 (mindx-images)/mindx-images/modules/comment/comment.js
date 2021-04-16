const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user', // userId
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'post' // postId
    }
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model('comment', CommentSchema);