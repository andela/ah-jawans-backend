/* eslint-disable max-len */

/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import model from '../models';

const { Articles, User } = model;

const createSlug = (text) => {
  let gen = `${text} ${(Math.floor(Math.random() * Math.floor(100000)))}`;
  while (gen.match(/ /g)) {
    gen = gen.replace(' ', '-');
  }
  return gen;
};

class articleContoller {
  static async createArticle(req, res) {
    const {
      title,
      body,
      description,
      image
    } = req.body;

    const slug = createSlug(title);
    const user = await User.findOne({ where: { email: req.user.email } });
    let article;
    user
      ? article = await Articles.create({ slug,
        title,
        description,
        body,
        image,
        authorId: user.id, })
      : res.status(401).json({ message: "User not allowed to create an article, login or signin if you don't have an account" });

    article && res.status(201).json({ message: 'The article successfully created!' });
  }

  static async updateArticle(req, res) {
    const {
      title,
      body,
      description,
      image
    } = req.body;

    const slug = createSlug(title || req.article.title);
    const updatedArticle = await Articles.update({ id: req.article.id,
      slug,
      title: title || req.article.title,
      description: description || req.article.description,
      body: body || req.article.body,
      image: image || req.article.image,
      authorId: req.user.id }, { where: { id: req.params.id } });

    updatedArticle && res.status(201).json({ message: 'The article successfully updated!' });
  }

  static async getAllArticles(req, res) {
    try {
      const articles = await Articles.findAll();
      articles && res.status(200).json({ articles });
    } catch (error) {
      return res.status(404).json({ error: 'No article found' });
    }
  }

  static async getOneArticle(req, res) {
    try {
      const article = await Articles.findOne({ where: { id: req.params.id } });
      return res.status(200).json({ article });
    } catch (error) {
      return res.status(404).json({ message: 'Article not found!', });
    }
  }

  static async deleteArticle(req, res) {
    try {
      const article = await Articles.findOne({ where: { id: req.params.id } });

      let deletedArticle;
      article && (deletedArticle = await Articles.destroy({ where: { id: req.params.id }, returning: true }));
      deletedArticle && res.status(200).json({ message: 'Article Succesfully deleted!' });

      return res.status(404).json({ message: 'Article not found!', });
    } catch (error) {
      return res.status(500).json({ message: 'The parameter should be a number!', });
    }
  }
}

export default articleContoller;
