/* eslint-disable require-jsdoc */
import decode from '../helpers/tokenGenerator';

class CheckUser {
  static async checkUser(req, res, next) {
    try {
      const userInf = await decode.decodeToken(req.headers.token);
      req.user = userInf;
      next();
    } catch (error) {
      return res.status(401).json({ message: "User not allowed to perform the task, please login or signup if you don't have an account" });
    }
  }
}

export default CheckUser;
