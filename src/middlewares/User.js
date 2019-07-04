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

export {
  checkEmail,
  decodeResetPasswordToken
};
