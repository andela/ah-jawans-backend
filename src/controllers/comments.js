import models from '../models';
import eventEmitter from '../template/notifications/EventEmitter';

const { Comments } = models;
/**
 * @description CRUD for comments
 * @author: Patrick Ngabonziza
 */
export default class ArticleComment {
  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Add comment
     */
  static async createComment(req, res) {
    try {
      const { body } = req.body;
      const { articleId } = req.params;
      const createComment = await Comments.create({ body, articleId, userId: req.user.id });
      eventEmitter.emit('commentArticle', createComment.dataValues);
      return res.status(201).json({ message: 'comment created!',
        comment: createComment });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Edit comment
     */
  static async updateComment(req, res) {
    try {
      const { articleId, commentId } = req.params;
      const findComent = await Comments.findOne({ where: { id: commentId, articleId } });
      return findComent
        ? await Comments.update({ body: req.body.body },
          { where: { id: commentId, articleId } }) && res.status(200).json({ message: 'Comment modified!' })
        : res.status(404).json({ message: 'Comment not found!' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Delete a comment
 */
  static async deleteComment(req, res) {
    try {
      const { articleId, commentId } = req.params;
      const removeComment = await Comments.destroy({ where: { id: commentId, articleId } });
      return removeComment
        ? res.status(204).json({ message: 'comment deleted' })
        : res.status(404).json({ message: 'comment not found!' });
    } catch (error) {
      return res.status(500).json({ error: 'server error, something went wrong!!' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Get all comments
   */
  static async getAllcomments(req, res) {
    try {
      const allComments = await Comments.findAll({ where: { articleId: req.params.articleId } });
      return allComments ? res.status(200).json({ message: 'All Comments', comments: allComments })
        : res.status(404).json({ message: 'No comments found!' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
