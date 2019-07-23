/* eslint-disable require-jsdoc */
import Sequelize from 'sequelize';
import model from '../../models';

const { Op } = Sequelize;

const { LikeAndDislike } = model;
class LikesDislikesHelpers {
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

  static async findUnlikedArticle(id, findArticleId, object1, object2) {
    const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
      articleId: findArticleId,
      [Op.or]: [object1, object2] } });

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

  static async ChangeLikeStatus(object, likesDislikeId) {
    const updateFromDislikeToLike = await LikeAndDislike.update(object,
      { where: { id: likesDislikeId } });

    return updateFromDislikeToLike;
  }

  // static async countArticleLikes(articleId) {
  //   const likes = await LikeAndDislike.count({ where: { articleId,
  //     likes: true } });

  //   return likes;
  // }

  // static async countArticleDisikes(articleId) {
  //   const dislikes = await LikeAndDislike.count({ where: { articleId,
  //     dislikes: true } });

  //   return dislikes;
  // }

  static async countArticleDisikesLikes(object) {
    const dislikes = await LikeAndDislike.count(object);

    return dislikes;
  }
}

export default LikesDislikesHelpers;
