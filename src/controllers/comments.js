/* eslint-disable prefer-const */
import models from '../models';
import eventEmitter from '../template/notifications/EventEmitter';
import { countcomment } from './helpers/likeCommentHelper';

const { Comments, Articles, User, CommentsHistories } = models;

const commentHistoryCreate = async (req, findComent) => {
  CommentsHistories.create({ userId: req.user.id,
    editedComment: findComent.dataValues.body,
    commentId: findComent.dataValues.id });
  return commentHistoryCreate;
};

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
      return res.status(201).json({ status: 201,
        message: 'comment created!',
        comment: createComment });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Create threaded comments
   */
  static async createThreadComment(req, res) {
    try {
      const { body } = req.body;
      const { articleId, commentId } = req.params;
      const userId = req.user.id;

      const checkIfArticleExists = await Articles.findByPk(articleId);
      if (!checkIfArticleExists) return res.status(404).json({ status: 404, message: 'Article does not exist' });
      const checkIfCommentExists = await Comments.findByPk(commentId);
      if (!checkIfCommentExists) return res.status(404).json({ status: 404, message: 'Comment does not exist' });
      const checkUser = await User.findByPk(userId);
      if (!checkUser) return res.status(404).json({ status: 404, message: 'User not found' });

      const newThreadedComment = await Comments.create({ userId,
        articleId,
        body,
        parentId: commentId });
      return res.status(201).json({ status: 201,
        message: 'Commented under this thread!',
        newThreadedComment });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
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
          { where: { id: commentId, articleId, userId: req.user.id } })
           && await commentHistoryCreate(req, findComent)
           && res.status(200).json({ status: 200, message: 'Comment modified!' })
        : res.status(404).json({ status: 404, message: 'Comment not found!' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  /**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Delete a comment
 */
  static async deleteComment(req, res) {
    try {
      const userId = req.user.id;
      const { articleId, commentId } = req.params;
      const deleteComment = await Comments.destroy({ where: { id: commentId, articleId, userId } });
      return deleteComment
        ? res.status(204).json({ status: 204, message: 'comment deleted' })
        : res.status(404).json({ status: 404, message: 'comment not found!' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
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
      let object;
      const article = await Articles.findOne({ where: { id: req.params.articleId },
        include: [{ attributes: ['id', 'createdAt', 'updatedAt', 'body'],
          as: 'Comments',
          model: Comments,
          include: [{ as: 'author',
            model: User,
            attributes: ['username', 'bio', 'image', 'following'] }] }] });
      const count = await countcomment(object);
      return article ? res.status(200).json({ status: 200,
        comments: article.Comments,
        commentsCount: count })
        : res.status(404).json({ status: 404, message: 'No comments found!' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }


  /**
   * @description - Users should be able to track edit history
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async commentHistory(req, res) {
    const { commentId } = req.params;
    const { id } = req.user;
    const findHistory = await CommentsHistories.findAll({ where: { commentId } });
    return findHistory.length
      ? (findHistory[0].dataValues.userId === id)
       && res.status(200).json({ status: 200, data: { findHistory } })
      : res.status(404).json({ status: 404, message: 'No edit history for this comment!' });
  }
}
