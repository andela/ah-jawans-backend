/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = Tokenizer;

export default class UserController {
  static async createUser(req, res) {
   
    try {
      
      const { username, email, password } = req.body;
      console.log('request', req.body.email);
      // const hashedPasword = bcrypt.hashSync(req.body.password);

      console.log("hghg", User);

      const user = await User.create({
        username,
        email,
        password,
      });
      console.log(user,'ngabo');
      const generatedToken = await generateToken({ email });
    
      return res.status(200).json({
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