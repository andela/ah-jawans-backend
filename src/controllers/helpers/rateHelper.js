/* eslint-disable no-unused-expressions */
import model from '../../models';

const { Rating, Articles } = model;

const findArticle = articleId => Articles.findOne({ where: { id: articleId } });

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
//
const rateValidation = (value) => {
  if (!value || value === '') {
    return true;
  }
  return false;
};
export {
  findRatings,
  checkRateRange,
  findArticle,
  rateValidation
};
