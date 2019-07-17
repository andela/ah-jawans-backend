/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import model from '../models';

const { User, Articles } = model;

class AuthenticateUser {
  static async checkUserArticle(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.user.email } });
      if (!user) return res.status(403).json({ message: 'User not found!' });
      const article = await Articles.findOne({ where: { id: req.params.id, } });

      if (!article) return res.status(404).json({ message: 'Article not found in the system!' });
      user.id !== article.authorId && res.status(403).json({ message: 'You are not allowed to perform this operation!' });
      req.article = article.dataValues;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}

export default AuthenticateUser;
