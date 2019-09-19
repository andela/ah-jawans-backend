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
    const disliked = await LikesDislikesHelpers.findDisliked(id, articleId);
    const unlikedArticle = await LikesDislikesHelpers.findUnlikedArticle(id,
      articleId, { dislikes: false }, { likes: true });
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

    if (disliked[0]) {
      await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: true },
        disliked[0].id);
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

    const dislikedArticle = await LikesDislikesHelpers.findUnlikedArticle(id,
      articleId, { dislikes: true }, { likes: false });
    const disliked = await LikesDislikesHelpers.findDisliked(id, articleId);
    const liked = await LikesDislikesHelpers.findArticleLikes(id, articleId);
    const userReacted = await LikesDislikesHelpers.userLikedOrDiskedArticle(id, articleId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        articleId: article.id,
        dislikes: true,
        likes: false });
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where:
        { articleId: article.id },
      dislikes: true });
      return res.status(200).json({ dislikes });
    }

    if (disliked[0]) {
      await LikesDislikesHelpers.updateArticleDisliskes(disliked[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        dislikes: true } });
      return res.status(200).json({ dislikes });
    }
    if (dislikedArticle[0]) {
      await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: true, likes: false },
        dislikedArticle[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        dislikes: true } });
      return res.status(200).json({ dislikes });
    }

    if (liked[0]) {
      await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: true, likes: false },
        liked[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId,
        dislikes: true } });
      return res.status(200).json({ dislikes });
    }
  }

  // eslint-disable-next-line require-jsdoc
  static async getNumberOfLikes(req, res) {
    const { id } = req.params;
    const likes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: id,
      likes: true } });
    return res.status(200).json({ likes });
  }

  // eslint-disable-next-line require-jsdoc
  static async getNumberOfDislikes(req, res) {
    const { id } = req.params;
    const dislikes = await LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: id,
      dislikes: true } });
    return res.status(200).json({ dislikes });
  }
}

export default LikesAndDislikes;
