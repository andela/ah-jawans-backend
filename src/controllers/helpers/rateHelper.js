/* eslint-disable no-unused-expressions */
import model from '../../models';

const { Rating, Articles } = model;

const findArticle = async (articleId) => {
  const article = await Articles.findOne({ where: { id: articleId } });
  return article;
};
const findRatings = async (userId, articleId) => {
  const rating = await Rating.findOne({ where: { reviewerId: userId, articleId } });
  return rating;
};
const checkRateRange = async (rate) => {
  let ratingRange;
  (rate <= 5 && rate >= 0)
    ? ratingRange = 1
    : ratingRange = 0;

  return ratingRange;
};

export {
  findRatings,
  checkRateRange,
  findArticle
};
