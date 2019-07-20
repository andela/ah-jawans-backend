/* eslint-disable require-jsdoc */
import Sequelize from 'sequelize';
import model from '../models';

const { Op } = Sequelize;

const { Articles, LikeAndDislike } = model;
class LikesDislikesHelpers {
  static async findOneArticle(findArticleId) {
    const oneArticle = await Articles.findOne({ where: { id: findArticleId } });
    return oneArticle;
  }

  static async findArticleLikes(id, findArticleId) {
    const liked = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId,
      likes: true } });

    return liked;
  }

  static async userLikedOrDiskedArticle(id, findArticleId) {
    const userReacted = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId } });

    return userReacted;
  }

  static async findUnlikedArticle(id, findArticleId) {
    const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId,
      [Op.or]: [{ dislikes: false }, { dislikes: null }] } });

    return unlikedArticle;
  }

  static async findDislikedArticle(id, findArticleId) {
    const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId,
      [Op.or]: [{ likes: false }, { likes: null }] } });

    return unlikedArticle;
  }

  static async findDisliked(id, findArticleId) {
    const disliked = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId,
      dislikes: true } });

    return disliked;
  }

  static async updateArticlesLiskes(likesDislikeId) {
    const updateLike = await LikeAndDislike.update({ likes: false },
      { where: { id: likesDislikeId } });

    return updateLike;
  }

  static async updateArticleDisliskes(likesDislikeId) {
    const updateDislike = await LikeAndDislike.update({ dislikes: false },
      { where: { id: likesDislikeId } });

    return updateDislike;
  }

  static async ChangeFromDislikeToLike(likesDislikeId) {
    const updateFromDislikeToLike = await LikeAndDislike.update({ dislikes: false, likes: true },
      { where: { id: likesDislikeId } });

    return updateFromDislikeToLike;
  }

  static async ChangeFromLikeToDislike(likesDislikeId) {
    const updateFromDislikeToLike = await LikeAndDislike.update({ dislikes: true, likes: false },
      { where: { id: likesDislikeId } });

    return updateFromDislikeToLike;
  }

  static async countArticleLikes(articleId) {
    const likes = await LikeAndDislike.count({ where: { articleId,
      likes: true } });

    return likes;
  }

  static async countArticleDisikes(articleId) {
    const dislikes = await LikeAndDislike.count({ where: { articleId,
      dislikes: true } });

    return dislikes;
  }
}

export default LikesDislikesHelpers;
