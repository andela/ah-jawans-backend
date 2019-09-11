/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import model from '../models';
import searchUserHelper from './helpers/searchUserHelper';
import { searchArticlesHelper, articleCount } from './helpers/searchArticlesHelper';
import eventEmitter from '../template/notifications/EventEmitter';
import findUser from '../helpers/FindUser';
import readTime from './helpers/read_time';
import createSlug from './helpers/createSluge';
import { getHightlights, updateHightlights } from './helpers/highlightHelper';
import { getAllArticles, articlePagination, getAllArticlesAuthor, articlePaginationForAuthor } from './helpers/getAllArticlesHelper';
import ReadingStatsHelper from './helpers/readingStatsHelper';


const { Articles, User, LikeAndDislike } = model;

class articleContoller {
  static async createArticle(req, res) {
    const {
      title,
      body,
      description,
      tags
    } = req.body;
    const ReadTime = readTime(req.body.body);
    const tagList = tags ? tags.split(',') : [];
    const slug = createSlug(title);
    const imageArticle = req.files && req.files[0].originalname
      ? `${req.files[0].version}/${req.files[0].public_id}.${req.files[0].format}`
      : null;
    const user = await User.findOne({ where: { email: req.user.email } });
    const userInfo = await findUser(req.user.username);
    let article;
    user
      ? article = await Articles.create({ slug,
        title,
        description,
        body,
        image: imageArticle,
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
      tags
    } = req.body;
    if (req.body.body) {
      const tagList = tags ? tags.split(',') : [];
      const slug = createSlug(title || req.article.title);
      const newReadTime = readTime(req.body.body);
      const updatedArticle = await Articles.update({ id: req.article.id,
        slug,
        title: title || req.article.title,
        description: description || req.article.description,
        body: body || req.article.body,
        image: image || req.article.image,
        readtime: newReadTime,
        tagList,
        authorId: req.user.id }, { where: { id: req.params.id } });
      updatedArticle && res.status(200).json({ message: 'The article successfully updated!' });
    } else {
      res.status(404).json({ message: 'article doenot have either title, description or body' });
    }
  }

  static async getArticle(req, res) {
    try {
      const articleId = req.params.id;
      const article = await Articles.findOne({ where: { id: articleId } });
      const likesOrDislikes = await LikeAndDislike.findAll({ where: { articleId: article.get().id } });
      const highlight = await getHightlights(articleId);
      const author = await User.findOne({ where: { id: article.authorId } });
      if (article) {
        await ReadingStatsHelper.updateStatistic(req.params.id);
        if (highlight) {
          await updateHightlights(req.params.id);
        }
        return res.status(200).json({ status: 200,
          article: { id: article.id,
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            image: article.image,
            tagList: article.tagList,
            readers: article.readers,
            readtime: article.readtime,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            likesOrDislikes,
            author: { username: author.username,
              bio: author.bio,
              image: author.image,
              following: author.following },
            highlight } });
      }
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  }

  static async getArticleSlug(req, res) {
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
    const { authorName, tag, keyword, title, offset, limit } = req.query;

    if (!authorName && !tag && !keyword && !title) return res.status(400).json({ error: 'Bad request' });

    let user = [];
    if (authorName) user = await searchUserHelper(authorName, offset, limit);
    const counts = await articleCount(tag, keyword, title, user);
    const data = await searchArticlesHelper(tag, keyword, title, user, offset, limit);

    return data.length ? res.status(200).json({ data, counts }) : res.status(404).json({ message: 'No data found' });
  }


  static async getArticles(req, res) {
    (req.query.offset && req.query.limit) ? await articlePagination(req, res) : await getAllArticles(req, res);
  }

  static async getArticlesForAuthor(req, res) {
    (req.query.offset && req.query.limit)
      ? await articlePaginationForAuthor(req, res)
      : await getAllArticlesAuthor(req, res);
  }
}
export default articleContoller;
