const jwt = require('jsonwebtoken');
const UserModel = require('../modules/auth/user');

async function isAuth(req, res, next) {
  const token = req.headers.authorization;

  try {
    if (!token) throw new Error('Empty token');

    const decodeData = jwt.verify(token, process.env.PRIVATE_KEY);
    // { userId: existedUser._id }
    const { userId } = decodeData;
    const existedUser = await UserModel.findById(userId);

    if (!existedUser) throw new Error('Not existed user');

    // gan them du lieu cho req
    req.user = existedUser;
    next();
  } catch (err) {
    res.status(401).send({ success: 0, message: err.message });
  }
}

module.exports = isAuth;