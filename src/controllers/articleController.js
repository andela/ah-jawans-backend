/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import model from '../models';
import searchUserHelper from './helpers/searchUserHelper';
import searchArticlesHelper from './helpers/searchArticlesHelper';
import eventEmitter from '../template/notifications/EventEmitter';
import findUser from '../helpers/FindUser';
import readTime from './helpers/read_time';

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
      image,
      tags
    } = req.body;
    let tagList;
    const ReadTime = readTime(req.body.body);
    tags ? (tagList = tags.split(',')) : tagList = [];
    const slug = createSlug(title);
    const user = await User.findOne({ where: { email: req.user.email } });
    const userInfo = await findUser(req.user.username);
    let article;
    user
      ? article = await Articles.create({ slug,
        title,
        description,
        body,
        image,
        tagList,
        readtime: ReadTime,
        authorId: user.id, })
      : res.status(401).json({ message: "User not allowed to create an article, login or signin if you don't have an account" });
    eventEmitter.emit('publishArticle', userInfo.id, slug);
    article && res.status(201).json({ message: 'The article successfully created!' });
  }

  static async updateArticle(req, res) {
    const {
      title,
      body,
      description,
      image,
    } = req.body;
    if (req.body.body) {
      const slug = createSlug(title || req.article.title);
      const newReadTime = readTime(req.body.body);
      const updatedArticle = await Articles.update({ id: req.article.id,
        slug,
        title: title || req.article.title,
        description: description || req.article.description,
        body: body || req.article.body,
        image: image || req.article.image,
        readtime: newReadTime,
        authorId: req.user.id }, { where: { id: req.params.id } });
      updatedArticle && res.status(200).json({ message: 'The article successfully updated!' });
    } else {
      res.status(404).json({ message: 'article doenot have either title, description or body' });
    }
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
      if (article) return res.status(200).json({ article });
      res.status(404).json({ message: 'No article found!' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', });
    }
  }

  static async getOneArticleSlug(req, res) {
    try {
      const article = await Articles.findOne({ where: { slug: req.params.slug } });
      if (article) return res.status(200).json({ article });
      res.status(404).json({ message: 'No article found!' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server error', });
    }
  }

  static async deleteArticle(req, res) {
    try {
      const article = await Articles.findOne({ where: { id: req.params.id } });

      let deletedArticle;
      article && (deletedArticle = await Articles.destroy({ where: { id: req.params.id }, returning: true }));
      if (deletedArticle) return res.status(200).json({ message: 'Article Succesfully deleted!' });

      return res.status(404).json({ message: 'Article not found!', });
    } catch (error) {
      return res.status(500).json({ message: 'The parameter should be a number!', });
    }
  }

  static async share(req, res) {
    return res.status(200).json({ message: 'Thanks for sharing!',
      article: req.article });
  }

  static async searchArticles(req, res) {
    Object.keys(req.query).length === 0 && res.status(400).json({ error: req.query });
    const { authorName, tag, keyword, title } = req.query;

    if (!authorName && !tag && !keyword && !title) return res.status(400).json({ error: 'Bad request' });

    let user = [];
    if (authorName) user = await searchUserHelper(authorName);
    const data = await searchArticlesHelper(tag, keyword, title, user);

    return data.length ? res.status(200).json({ data }) : res.status(404).json({ message: 'No data found' });
  }
}
export default articleContoller;