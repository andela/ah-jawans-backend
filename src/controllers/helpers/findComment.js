import model from '../../models';

const { Comments } = model;

const findComment = async (commentId) => {
  const oneArticle = await Comments.findOne({ where: { id: commentId } });
  return oneArticle;
};

export default findComment;
