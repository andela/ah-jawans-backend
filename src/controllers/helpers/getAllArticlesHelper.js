/* eslint-disable no-shadow */
/* eslint-disable prefer-const */

import model from '../../models';

const { Articles, User } = model;
let object;

const countArticle = async (object) => {
  const count = await Articles.count(object);
  return count;
};

const countArticleAuthors = async (authorId) => {
  const count = await Articles.count({ where: { authorId } });
  return count;
};

const getArticle = async (res, req, offset, limit) => {
  if (offset && limit) {
    const allArticles = await Articles.findAll({ offset,
      limit,
      attributes: ['id', 'slug', 'title', 'body', 'image', 'tagList', 'readtime', 'createdAt', 'updatedAt'],
      include: [
        { model: User,
          as: 'author',
          attributes: ['username', 'bio', 'image', 'following'] }
      ], });
    return allArticles;
  // eslint-disable-next-line no-else-return
  } else {
    const allArticles1 = await Articles.findAll({ attributes: ['id', 'slug', 'title', 'body', 'image', 'tagList', 'readtime', 'createdAt', 'updatedAt'],
      include: [
        { model: User,
          as: 'author',
          attributes: ['username', 'bio', 'image', 'following'] }
      ], });
    return allArticles1;
  }
};

const getAllArticles = async (req, res) => {
  try {
    const allArticles = await getArticle(res);
    const count = await countArticle(object);
    return res.status(200).json({ status: 200,
      articles: allArticles,
      articlesCount: count, });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

const articlePagination = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const allArticles = await getArticle(res, req, offset, limit);
    const count = await countArticle(object);
    return allArticles.length ? res.status(200).json({ status: 200,
      articles: allArticles,
      articlesCount: count, }) : res.status(404).json({ status: 404, message: 'page not found' });
  } catch (error) {
    return res.status(404).json({ status: 404, message: 'No article found' });
  }
};

const getArticleAuthor = async (res, req, offset, limit, authorId) => {
  if (offset && limit) {
    const allArticlesAuthors = await Articles.findAll({ offset,
      limit,
      where: { authorId } });
    return allArticlesAuthors;
  // eslint-disable-next-line no-else-return
  } else {
    const allArticlesAuthors1 = await Articles.findAll({ where: { authorId } });
    return allArticlesAuthors1;
  }
};

const articlePaginationForAuthor = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const { authorId } = req.params;
    const ArticlesAuthors = await getArticleAuthor(res, req, offset, limit, authorId);
    const count = await countArticleAuthors(authorId);
    return ArticlesAuthors.length ? res.status(200).json({ status: 200,
      articles: ArticlesAuthors,
      articlesCount: count, }) : res.status(404).json({ status: 404, message: 'page not found' });
  } catch (error) {
    return res.status(404).json({ status: 404, message: 'No article found' });
  }
};

const getAllArticlesAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const allArticlesAuthor = await Articles.findAll({ where: { authorId } });
    const count = await countArticleAuthors(authorId);
    return res.status(200).json({ status: 200,
      articles: allArticlesAuthor,
      articlesCount: count, });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

export {
  getAllArticles,
  articlePagination,
  articlePaginationForAuthor,
  getArticleAuthor,
  getAllArticlesAuthor,

};
