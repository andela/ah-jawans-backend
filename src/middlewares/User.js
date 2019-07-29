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
    return res.status(500).json({ status: 500, message: 'token error' });
  }
};

const checkEmail = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.decode.email });
    if (!check) {
      return res.status(404).json({ status: 404, message: 'sorry your email not found.' });
    }
    req.userInfo = check;
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
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
  // usernameAvailability,
  usernameCheck
};
