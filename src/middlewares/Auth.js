/* eslint-disable require-jsdoc */
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { Blacklist, User } = models;
const { decodeToken } = Tokenizer;

export default class Auth {
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401)
        .json({ status: 401, error: 'There is no token' });
    }
    const decodedUserInfo = await decodeToken(token);
    const user = await User.findOne({ where: { id: decodedUserInfo.id } });
    const checkBlackList = await Blacklist.findOne({ where: { token } });

    if (checkBlackList) return res.status(401).json({ error: 'invalid token' });

    req.token = token;
    req.user = user;
    next();
  }
}
