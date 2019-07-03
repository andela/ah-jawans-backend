/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import _ from 'underscore';
import UserService from '../services/userService';
import Tokenizer from '../helpers/tokenGenerator';

const { generateToken } = Tokenizer;

export default class AuthController {
  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.getUser(email);
      if (!user) {
        return res.status(400).json({
          error: 'Invalid username or password!'
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          error: 'Invalid username or password'
        });
      }
      const newUser = _.omit(user.dataValues, 'password');
      const token = await generateToken(newUser);
      return res.status(200).json({
        data: {
          token,
          email: newUser.email,
          username: newUser.username
        }
      });
    } catch (error) {
      return res.status(500)
        .json({
          Error: error
        });
    }
  }
}
