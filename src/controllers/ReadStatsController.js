import models from '../models';

const { Articles, Comments } = models;
/**
 * @class { ReadingStatsController }
 * @description { Handles Reading stats GET Requests }
 */
export default class ReadingStatsController {
  /**
   * GET article readers
     * @param {object} req
     * @param {object} res
     * @returns {object} Get articles readers object
   */
  static async getArticleReaders(req, res) {
    const { articleId } = req.params;
    const articleReaders = await Articles.findAll({ attributes: ['title', 'readers'],
      where: { id: articleId } });
    const { title, readers } = articleReaders[0];
    return res.status(200).json({ data: { title, readers } });
  }

  /**
  /**
     * Get comments stats
     * @param {object} req
     * @param {object} res
     * @returns {object} Get articles readers object
   */
  static async numberOfComments(req, res) {
    const { articleId } = req.params;
    const countComments = await Comments.count({ where: { articleId } });
    return res.status(200).json({ status: 200,
      data: { articleId,
        countComments } });
  }
}
