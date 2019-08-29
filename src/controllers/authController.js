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
        return res.status(403).json({ error: 'Invalid username or password!' });
      }

      const isPasswordValid = await bcrypt.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(403).json({ error: 'Invalid username or password' });
      }

      const payload = { username: user.username,
        id: user.id,
        email: user.email,
        roles: user.roles };

      const token = await generateToken(payload);
      return res.status(200).json({ message: 'Logged in successfully',
        data: { token,
          username: user.username,
          email: user.email,
          id: user.id } });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
