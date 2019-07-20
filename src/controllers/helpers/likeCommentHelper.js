/* eslint-disable require-jsdoc */
import Sequelize from 'sequelize';
import model from '../../models';

const { Op } = Sequelize;

const { LikeAndDislike, Comments } = model;

const findOneComment = async (commentId) => {
  const foundComment = await Comments.findOne({ where: { id: commentId } });

  return foundComment;
};

const userLikedOrDiskedComment = async (id, commentId) => {
  const userReacted = await LikeAndDislike.findAll({ where: { userId: id,
    commentId } });

  return userReacted;
};

const findDislikedComment = async (id, commentId) => {
  const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    [Op.or]: [{ likes: false }, { dislikes: true }] } });

  return unlikedArticle;
};

const findLikedComment = async (id, commentId) => {
  const unlikedArticle = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    [Op.or]: [{ dislikes: false }, { likes: true }] } });

  return unlikedArticle;
};

const findDisliked = async (id, commentId) => {
  const disliked = await LikeAndDislike.findAll({ where: { userId: id,
    commentId,
    dislikes: true } });

  return disliked;
};

const ChangeFromDislikeToLike = async (dislikeId) => {
  const updateFromDislikeToLike = await LikeAndDislike.update({ dislikes: false, likes: true },
    { where: { id: dislikeId } });

  return updateFromDislikeToLike;
};

const ChangeFromLikeToDisLike = async (dislikeId) => {
  const updateFromDislikeToLike = await LikeAndDislike.update({ dislikes: true, likes: false },
    { where: { id: dislikeId } });

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

const countCommentLikes = async (commentId) => {
  const likes = await LikeAndDislike.count({ where: { commentId,
    likes: true } });

  return likes;
};

const countCommentDislikes = async (commentId) => {
  const dislikes = await LikeAndDislike.count({ where: { commentId,
    dislikes: true } });

  return dislikes;
};

export {
  countCommentDislikes,
  countCommentLikes,
  undoLikeOrDislikeComments,
  findCommentLikes,
  ChangeFromLikeToDisLike,
  ChangeFromDislikeToLike,
  findDisliked,
  findLikedComment,
  findDislikedComment,
  userLikedOrDiskedComment,
  findOneComment
};
