import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { decodeToken } = Tokenizer;

// @middleware for decoding reset password token

const decodeResetPasswordToken = async (req, res, next) => {
  try {
    const decode = await decodeToken(req.params.token);
    req.decode = await decode;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'token error' });
  }
};

const checkEmail = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.decode.email });
    if (!check) {
      return res.status(404).json({ error: 'sorry your email not found.' });
    }
    req.userInfo = check;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const usernameAvailability = async (req, res, next) => {
  const userConstant = await models.User.findOne({ where: { username: req.params.username }, });
  // eslint-disable-next-line no-cond-assign
  if (userConstant.dataValues.username !== req.params.username) {
    return res.status(400).json({ status: 400,
      message: 'This username is not available, Please choose another one!', });
  }
  next();
};

const usernameCheck = async (req, res, next) => {
  // eslint-disable-next-line no-constant-condition
  if (!req.params.username || !(/^[A-Za-z_-]+$/.test(req.params.username))) {
    return res.status(401).json({ status: 401,
      message: 'username is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)!', });
  }
  next();
};

export {
  checkEmail,
  decodeResetPasswordToken,
  usernameAvailability,
  usernameCheck
};
