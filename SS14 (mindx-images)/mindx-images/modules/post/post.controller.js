const PostModel = require('./post');

const createPost = async ({ imageUrl, title, description, createdBy }) => {
  const newPost = await PostModel.create({
    imageUrl, title, description, createdBy
  });

  return newPost;
}

const getPosts = async ({ offset, limit }) => {
  // const posts = await PostModel.find().skip(offset).limit(limit);

  // example: offset 1, limit 10 => 1 - 10
  // example: offset 20, limit 6 => 20 - 25

  // const total = await PostModel.countDocuments();

  const [posts, total] = await Promise.all([
    PostModel
      .find()
      .skip(offset)
      .limit(limit)
      .select('-__v')
      .populate({ 
        path: 'createdBy', 
        select: '-password'
        // select: 'email _id' 
      }),      
    PostModel.countDocuments()
  ])
  // cơ chế populate là cơ chế chỉ mongoose có, đơn giản hoá cơ chế lookup mongodb
  // cơ chế select tương ứng với project trong mongodb

  // await một lần thôi => posts, total => aggregate
  return [posts, total];
}

const getDetailPost = async (postId) => {
  const foundPost = await PostModel.findById(postId)
    .populate('createdBy', 'email')
    .populate({
      path: 'comments',
      populate: {
        path: 'createdBy' // populate multiple level
      }
    }); // populate ngược
  
  if (!foundPost) throw new Error('Not found post');

  return foundPost;
}

module.exports = {
  createPost,
  getPosts,
  getDetailPost
}