import model from '../models';
import LikesDislikesHelpers from './helpers/likeAndDislikes';
import findArticle from './helpers/findArticle';

const { LikeAndDislike } = model;

const constDeaclarations = async (req) => {
  const articleId = req.params.id;
  const { id } = req.user;
  const article = await findArticle(articleId);
  return { article, id };
};

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
    try {
      const articleconst = await constDeaclarations(req);
      if (!articleconst.article) return res.status(404).json({ status: 404, message: 'Article not found' });

      const userReacted = await
      LikesDislikesHelpers.userLikedOrDiskedArticle(req.user.id, articleconst.article.id);
      if (!userReacted[0]) {
        await LikeAndDislike.create({ userId: req.user.id,
          articleId: articleconst.article.id,
          likes: true,
          dislikes: false });
        const likes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          likes: true } });
        return res.status(200).json({ status: 200, likes });
      }

      if (userReacted[0].likes === true && userReacted[0].dislikes === false) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: false },
          userReacted[0].id);
        const likes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          likes: true } });
        return res.status(200).json({ status: 200, likes });
      }

      if (userReacted[0].likes === false && userReacted[0].dislikes === false) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: true },
          userReacted[0].id);
        const likes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          likes: true } });
        return res.status(200).json({ status: 200, likes });
      }

      if (userReacted[0].likes === false && userReacted[0].dislikes === true) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: true },
          userReacted[0].id);
        const likes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          likes: true } });
        return res.status(200).json({ status: 200, likes });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  /**
    * @param  {object} req
    * @param  {object} res
    * @return {object} Number of Dislikes
    */
  static async dislikeArticle(req, res) {
    try {
      const articleconst = await constDeaclarations(req);
      if (!articleconst.article) return res.status(404).json({ status: 404, message: 'Article not found' });

      const userReacted = await
      LikesDislikesHelpers.userLikedOrDiskedArticle(req.user.id, articleconst.article.id);
      if (!userReacted[0]) {
        await LikeAndDislike.create({ userId: req.user.id,
          articleId: articleconst.article.id,
          likes: false,
          dislikes: true });
        const dislikes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          dislikes: true } });
        return res.status(200).json({ status: 200, dislikes });
      }

      if (userReacted[0].likes === false && userReacted[0].dislikes === true) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: false, likes: false },
          userReacted[0].id);
        const dislikes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          dislikes: true } });
        return res.status(200).json({ status: 200, dislikes });
      }

      if (userReacted[0].likes === false && userReacted[0].dislikes === false) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: true, likes: false },
          userReacted[0].id);
        const dislikes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          dislikes: true } });
        return res.status(200).json({ status: 200, dislikes });
      }
      if (userReacted[0].likes === true && userReacted[0].dislikes === false) {
        await LikesDislikesHelpers.ChangeLikeStatus({ dislikes: true, likes: false },
          userReacted[0].id);
        const dislikes = await
        LikesDislikesHelpers.countArticleDisikesLikes({ where: { articleId: articleconst.article.id,
          dislikes: true } });
        return res.status(200).json({ status: 200, dislikes });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default LikesAndDislikes;
