/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import models from '../models';
import { findRatings, checkRateRange, findArticle, rateValidation } from './helpers/rateHelper';

const { Rating } = models;
const message = (req, res, status, data) => res.status(status).json(data);
class Rate {
  static async createRatings(req, res) {
    const { id } = req.user;
    const articleId = req.params.id;
    if (rateValidation(req.body.rating)) {
      return res.status(400).json({ error: 'provide rating' });
    }
    const article = await findArticle(articleId);
    if (!article) return res.status(404).json({ error: 'Article not found!' });
    const ratingRange = await checkRateRange(req.body.rating);
    const rating = await findRatings(id, articleId);

    if (ratingRange) {
      let newRating;
      rating
        ? newRating = await Rating.update({ rate: req.body.rating },
          { where: { id: rating.dataValues.id } })
        : newRating = await Rating.create({ rate: req.body.rating,
          reviewerId: id,
          articleId: article.dataValues.id });
      return newRating && res.status(200).json({ message: 'You have Rated the article' });
    }
    return res.status(400).json({ error: 'Bad Rating range' });
  }

  static async getAllRatings(req, res) {
    const { id: articleId } = req.params;
    try {
      const { offset, limit } = req.query;
      const ratingsCount = await Rating.findAll({ offset, limit }, { where: { id: articleId } });
      ratingsCount.length !== 0 ? message(req, res, 200, { ratingsCount }) : message(req, res, 404, { message: 'No Ratings found' });
    } catch (error) {
      return res.status(404).json({ error: 'No article found' });
    }
  }
}
export default Rate;
