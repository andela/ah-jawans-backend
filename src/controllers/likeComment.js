import model from '../models';
import { countCommentDislikes, countCommentLikes, undoLikeOrDislikeComments, findCommentLikes, ChangeFromLikeToDisLike, ChangeFromDislikeToLike, findDisliked, findLikedComment, findDislikedComment, userLikedOrDiskedComment, findOneComment } from './helpers/likeCommentHelper';

const { LikeAndDislike } = model;
/**
  * This LikeComment class
  */
class LikeComment {
  /**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Number of likes
 */
  static async likeComment(req, res) {
    const commentId = req.params.commentParamsId;
    const { id } = req.user;
    const comment = await findOneComment(commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const userReacted = await userLikedOrDiskedComment(id, commentId);
    const dislikedComment = await findDislikedComment(id, commentId);
    const liked = await findCommentLikes(id, commentId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        commentId: comment.id,
        likes: true,
        dislikes: false });
      const likes = await countCommentLikes(comment.id);

      return res.status(200).json({ likes });
    }

    if (liked[0]) {
      await undoLikeOrDislikeComments(liked[0].id);
      const likes = await countCommentLikes(comment.id);

      return res.status(200).json({ likes });
    }

    if (dislikedComment[0]) {
      await ChangeFromDislikeToLike(dislikedComment[0].id);
      const likes = await countCommentLikes(comment.id);

      return res.status(200).json({ likes });
    }
  }

  /**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Number of Dislikes
 */
  static async DislikeComment(req, res) {
    const commentId = req.params.commentParamsId;
    const { id } = req.user;
    const comment = await findOneComment(commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const userReacted = await userLikedOrDiskedComment(id, commentId);
    const likedComment = await findLikedComment(id, commentId);
    const dislikedComment = await findDisliked(id, commentId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        commentId: comment.id,
        likes: false,
        dislikes: true });
      const dislikes = await countCommentDislikes(comment.id);

      return res.status(200).json({ dislikes });
    }

    if (likedComment[0]) {
      await ChangeFromLikeToDisLike(likedComment[0].id);
      const dislikes = await countCommentDislikes(comment.id);

      return res.status(200).json({ dislikes });
    }

    if (dislikedComment[0]) {
      await undoLikeOrDislikeComments(dislikedComment[0].id);
      const dislikes = await countCommentDislikes(comment.id);

      return res.status(200).json({ dislikes });
    }
  }
}

export default LikeComment;
