import model from '../../models';

const { Comments } = model;

const findComment = commentId => Comments.findOne({ where: { id: commentId } });

export default findComment;
