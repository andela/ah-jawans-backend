/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import models from '../models';
import { findRatings, checkRateRange, findArticle } from './helpers/rateHelper';

const { Rating } = models;
class Rate {
  static async createRatings(req, res) {
    const { id } = req.user;
    const articleId = req.params.id;

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
      return newRating && res.status(204).json({ message: 'You have Rated the article' });
    }
    return res.status(400).json({ error: 'Bad Rating range' });
  }

  static async getAllRatings(req, res) {
    const articleId = req.params.id;
    const rating = await Rating.findAll({ where: { articleId } });

    return rating[0] ? res.status(200).json({ rating }) : res.status(404).json({ message: 'No ratings found' });
  }
}
export default Rate;
