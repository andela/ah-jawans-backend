import model from '../models';
import LikesDislikesHelpers from './helpers/likeAndDislikes';
import findArticle from './helpers/findArticle';

const { LikeAndDislike } = model;

/**
  * This class contains Like and dislike controller
  */
class LikesAndDislikes {
/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Number of likes
 */
  static async likeArticle(req, res) {
    const articleId = req.params.id;
    const { id } = req.user;
    const article = await findArticle(articleId);

    if (!article) return res.status(404).json({ message: 'Article not found' });

    const liked = await LikesDislikesHelpers.findArticleLikes(id, articleId);
    const unlikedArticle = await LikesDislikesHelpers.findUnlikedArticle(id,
      articleId, { dislikes: true }, { likes: false });
    const userReacted = await LikesDislikesHelpers.userLikedOrDiskedArticle(id, articleId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        articleId: article.id,
        likes: true,
        dislikes: false });
      const likes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        likes: true } });
      return res.status(200).json({ likes });
    }

    if (liked[0]) {
      await LikesDislikesHelpers.updateArticlesLiskes(liked[0].id);
      const likes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        likes: true } });
      return res.status(200).json({ likes });
    }

    if (unlikedArticle[0]) {
      await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: true },
        unlikedArticle[0].id);
      const likes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        likes: true } });
      return res.status(200).json({ likes });
    }
  }

  /**
    * @param  {object} req
    * @param  {object} res
    * @return {object} Number of Dislikes
    */
  static async dislikeArticle(req, res) {
    const articleId = req.params.id;
    const { id } = req.user;
    const article = await findArticle(articleId);

    if (!article) return res.status(404).json({ message: 'Article not found' });

    const undislikedArticle = await LikesDislikesHelpers.findUnlikedArticle(id,
      articleId, { likes: true }, { dislikes: false });
    const disliked = await LikesDislikesHelpers.findDisliked(id, articleId);
    const userReacted = await LikesDislikesHelpers.userLikedOrDiskedArticle(id, articleId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        articleId: article.id,
        dislikes: true,
        likes: true });
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes(article.dataValues.id,
        { dislikes: true });
      return res.status(200).json({ dislikes });
    }

    if (disliked[0]) {
      await LikesDislikesHelpers.updateArticleDisliskes(disliked[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        dislikes: true } });
      return res.status(200).json({ dislikes });
    }

    if (undislikedArticle[0]) {
      await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: true, likes: false },
        undislikedArticle[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        dislikes: true } });
      return res.status(200).json({ dislikes });
    }
  }
}

export default LikesAndDislikes;
