import LikesDislikesHelpers from '../controllers/helpers/likeAndDislikes';

export default async (args) => {
  const { res, article, userReacted, articleId, id,
    disliked, liked, dislikedArticle, LikeAndDislike } = args;
  const { countArticleDisikesLikes, ChangeLikeStatus,
    updateArticleDisliskes } = LikesDislikesHelpers;
  if (!userReacted[0]) {
    await LikeAndDislike.create({ userId: id,
      articleId: article.id,
      dislikes: true,
      likes: true });
    const dislikes = await countArticleDisikesLikes(article.dataValues.id, { dislikes: true });
    return res.status(200).json({ dislikes });
  } if (disliked[0]) {
    await updateArticleDisliskes(disliked[0].id);
    const dislikes = await countArticleDisikesLikes({ where: { articleId, dislikes: true } });
    return res.status(200).json({ dislikes });
  } if (dislikedArticle[0]) {
    await ChangeLikeStatus({ dislikes: true, likes: false }, dislikedArticle[0].id);
    const dislikes = await countArticleDisikesLikes({ where: { articleId, dislikes: true } });
    return res.status(200).json({ dislikes });
  } if (liked[0]) {
    await ChangeLikeStatus({ dislikes: true, likes: false }, liked[0].id);
    const dislikes = await countArticleDisikesLikes({ where: { articleId, dislikes: true } });
    return res.status(200).json({ dislikes });
  }
};
