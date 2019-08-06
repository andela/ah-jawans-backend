/* eslint-disable require-jsdoc */
import model from '../../models';

const { LikeAndDislike } = model;
class LikesDislikesHelpers {
  static async userLikedOrDiskedArticle(id, articleId) {
    const userReacted = await LikeAndDislike.findAll({ where: { userId: id,
      articleId } });
    return userReacted;
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
