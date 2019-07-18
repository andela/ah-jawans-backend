/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import model from '../models';
import { ArticleOwner, findArticle, findBookmark } from './helpers/findArticleOwner';

const { Bookmarks, Articles, User } = model;
class BookmarksController {
  static async bookmarkArticle(req, res) {
    try {
      const article = await findArticle(req.params.articleId);

      await ArticleOwner(req.params.articleId, req.user.id) && res.status(403).json({ error: 'Not allowed to bookmark your article' });
      const bookmark = article && await Bookmarks.create({ userId: req.user.id,
        articleId: article.dataValues.id });

      bookmark ? res.status(201).json({ message: 'Article added to bookmarks' }) : res.status(404).json({ error: 'No Article found!' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllBookmarks(req, res) {
    try {
      const bookmarks = await Bookmarks.findAll({ where: { userId: req.user.id },
        include: [
          { as: 'article',
            model: Articles,
            attributes: [
              'slug',
              'title',
              'description',
              'body',
              'updatedAt',
              'createdAt'],
            include: [
              { as: 'author',
                model: User,
                attributes: [
                  'username',
                  'bio',
                  'email',
                  'image'] }
            ] }
        ] });
      return bookmarks.length ? res.status(200).json({ bookmarks }) : res.status(404).json({ message: 'You do not have bookmark articles' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getOneBookmarkArticle(req, res) {
    try {
      const id = req.params.bookmarkId;
      const bookmarks = await Bookmarks.findOne({ where: { userId: req.user.id, id },
        include: [
          { as: 'article',
            model: Articles,
            attributes: [
              'slug',
              'title',
              'description',
              'body',
              'updatedAt',
              'createdAt'],
            include: [
              { as: 'author',
                model: User,
                attributes: [
                  'username',
                  'bio',
                  'email',
                  'image'] }
            ] }
        ] });
      return bookmarks ? res.status(200).json({ bookmarks }) : res.status(404).json({ message: 'Bookmark not found!' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteBookmark(req, res) {
    try {
      const bookmarkFind = await findBookmark(req.user.id, req.params.bookmarkId);
      let bookmark;
      bookmarkFind
        ? bookmark = await Bookmarks.destroy({ where: { id: bookmarkFind.dataValues.id } })
        : res.status(404).json({ error: 'No bookmarks found!' });

      bookmark && res.status(204).json({ message: 'Bookmark saccefully deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default BookmarksController;
