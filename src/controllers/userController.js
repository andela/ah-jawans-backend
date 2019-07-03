/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = Tokenizer;

export default class UserController {
  static async createUser(req, res) {
    try {
      const { username, email } = req.body;

      const hashedPasword = bcrypt.hashSync(req.body.password);

      const user = await User.create({
        username,
        email,
        password: hashedPasword,
      });

      const generatedToken = await generateToken({ email });

      return res.status(201)
        .json({
          user: {
            token: generatedToken,
            username: user.username,
            email: user.email,
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
