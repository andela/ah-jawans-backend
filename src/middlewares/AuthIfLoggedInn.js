/* eslint-disable require-jsdoc */
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { Blacklist, User } = models;
const { decodeToken } = Tokenizer;

export default class Authorization {
  static async AuthIfLoggedInn(req, res, next) {
    const tokenGen = req.headers.token;
    if (!tokenGen) {
      req.token = tokenGen;
      req.user = null;
      next();
    } else {
      const decodedUserInfo = await decodeToken(tokenGen);
      const user = await User.findOne({ where: { id: decodedUserInfo.id } });
      const checkBlackList = await Blacklist.findOne({ where: { tokenGen } });

      if (checkBlackList) return res.status(401).json({ status: 401, message: 'invalid token' });

      req.token = tokenGen;
      req.user = user.dataValues;
      next();
    }
  }
}
