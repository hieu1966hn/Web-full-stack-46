const bcrypt = require('bcryptjs');
const UserModel = require('./user');
const jwt = require('jsonwebtoken');

const createUser = async (user) => {
  const { email, password } = user;

  const existedUser = await UserModel.findOne({ email });

  if (existedUser) throw new Error('Existed user');

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await UserModel.create({ email, password: hashPassword });

  return newUser;
};

const login = async ({ email, password }) => {
  const existedUser = await UserModel.findOne({ email });
  // neu khong co .lean() => Query

  if (!existedUser) throw new Error('Not found user');

  const hashPassword = existedUser.password;

  const comparedPassword = bcrypt.compareSync(password, hashPassword);

  if (!comparedPassword) throw new Error('Password is wrong');

  // login success
  // mã hoá thông tin => token
  const data = { userId: existedUser._id };

  // jwt se dung mot thuat toan 
  // ma hoa data voi private key va thoi gian het han cua doan ma hoa do
  console.log(process.env.EXPIRE_TIME);
  const token = jwt.sign(
    data,
    process.env.PRIVATE_KEY,
    { expiresIn: process.env.EXPIRE_TIME }
  );

  return { user: existedUser, token };
};

module.exports = {
  createUser,
  login
};