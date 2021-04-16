const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, // option này chỉ nên define khi mà có dùng cơ hế virtual field
    toObject: { virtuals: true } 
  } // createdAt, updatedAt
);

PostSchema.virtual('comments', {
  ref: 'comment', // The model to use
  localField: '_id', // Find people where `localField` // modal post
  foreignField: 'post', // post của bên model comment
})

module.exports = mongoose.model('post', PostSchema);