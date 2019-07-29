/* eslint-disable require-jsdoc */
// eslint-disable-next-line import/no-extraneous-dependencies
import tokenGen from '../helpers/tokenGenerator';
import bcrypt from '../helpers/hash';
import models from '../models';

const { generateToken } = tokenGen;

const { User } = models;

export default class AuthController {
  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: String(email) } });
      if (!user) {
        return res.status(403).json({ status: 403, message: 'Invalid username or password!' });
      }

      const isPasswordValid = await bcrypt.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(403).json({ status: 403, message: 'Invalid username or password' });
      }

      const payload = { username: user.username,
        id: user.id,
        email: user.email,
        roles: user.roles };

      const token = await generateToken(payload);
      return res.status(200).json({ status: 200,
        message: 'Logged in successfully',
        user: { email: user.email,
          token,
          username: user.username,
          bio: user.bio,
          image: user.image } });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
