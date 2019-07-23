/* eslint-disable require-jsdoc */
import Sequelize from 'sequelize';
import model from '../../models';

const { Op } = Sequelize;

const { LikeAndDislike } = model;

const userLikedOrDiskedComment = async (id, commentId) => {
  const userReacted = await LikeAndDislike.findAll({ where: { userId: id,
    commentId } });
  return userReacted;
};

const findLikedOrDislikedComment = async (id, commentId, object1, object2) => {
  const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    [Op.or]: [object1, object2] } });
  return unlikedArticle;
};

const findDisliked = async (id, commentId) => {
  const disliked = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    dislikes: true } });
  return disliked;
};

const ChangeLikeOrDislikeStatus = async (object, likesDislikeId) => {
  const updateFromDislikeToLike = await LikeAndDislike.update(object,
    { where: { id: likesDislikeId } });
  return updateFromDislikeToLike;
};

const findCommentLikes = async (id, commentId) => {
  const liked = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    likes: true } });
  return liked;
};

const undoLikeOrDislikeComments = async (commentLike) => {
  const unlikeComment = await LikeAndDislike.update({ likes: false, dislikes: false },
    { where: { id: commentLike } });
  return unlikeComment;
};

const countArticleDisikesLikes = async (object) => {
  const likesDislikes = await LikeAndDislike.count(object);
  return likesDislikes;
};

export {
  countArticleDisikesLikes,
  undoLikeOrDislikeComments,
  findCommentLikes,
  findDisliked,
  ChangeLikeOrDislikeStatus,
  findLikedOrDislikedComment,
  userLikedOrDiskedComment
};
