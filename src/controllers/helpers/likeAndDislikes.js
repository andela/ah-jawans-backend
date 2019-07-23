/* eslint-disable require-jsdoc */
import Sequelize from 'sequelize';
import model from '../../models';

const { Op } = Sequelize;

const { LikeAndDislike } = model;
class LikesDislikesHelpers {
  static async findArticleLikes(id, articleId) {
    const liked = await LikeAndDislike.findAll({ where: { userId: id,
      articleId,
      likes: true } });

    return liked;
  }

  static async userLikedOrDiskedArticle(id, articleId) {
    const userReacted = await LikeAndDislike.findAll({ where: { userId: id,
      articleId } });

    return userReacted;
  }

  static async findUnlikedArticle(id, articleId, object1, object2) {
    const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
      articleId,
      [Op.or]: [object1, object2] } });

    return unlikedArticle;
  }

  static async findDisliked(id, articleId) {
    const disliked = await LikeAndDislike.findAll({ where: { userId: id,
      articleId,
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

  static async ChangeLikeStatus(object, likesDislikeId) {
    const updateFromDislikeToLike = await LikeAndDislike.update(object,
      { where: { id: likesDislikeId } });

    return updateFromDislikeToLike;
  }

  static async countArticleDisikesLikes(object) {
    const likesDislikes = await LikeAndDislike.count(object);
    return likesDislikes;
  }
}

export default LikesDislikesHelpers;
