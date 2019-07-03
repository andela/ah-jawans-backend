/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import SendGrid from '@sendgrid/mail';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = Tokenizer;


dotenv.config();

const { SENDGRID_API_KEY } = process.env;
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

  static async passwordReset(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res.status(404).json({ error: 'No user found with this email address.' });
      }
      const payload = {
        email: user.email
      };
      const token = await generateToken({ payload });
      // @sends a message to an existing email in our database with the below email template
      const message = `<div>You are receiving this because you (or someone else) requested the reset of your password.<br> 
          Please click on the followoing link or paste this link in youre browser to complete this process within one hour: <Br> 
          http://localhost:3000/api/users/passwordreset/${token}. <br>If you did not request this ,please ignore this email and your password will remain unchanged.</div>`;
      const mailOptions = {
        from: 'ahjawans@gmail.com',
        to: `${user.email}`,
        subject: 'Link to reset Password',
        html: message
      };
      SendGrid.setApiKey(SENDGRID_API_KEY);
      SendGrid.send(mailOptions);
      return res.status(200).json({ status: 200, message: 'Check your email to reset password', token });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error'
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const { password } = req.body;
      const hashPassword = bcrypt.hashSync(password);
      await User.update({ password: hashPassword }, {
        where: {
          id: req.userInfo.id
        }
      });

      res.status(200).json({
        status: 200,
        message: 'your password has been updated successfully'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}
