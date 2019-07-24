module.exports = (sequelize, DataTypes) => {
  const CommentsHistories = sequelize.define('CommentsHistories', { userId: DataTypes.INTEGER,
    editedComment: DataTypes.STRING,
    commentId: DataTypes.INTEGER }, {});
  return CommentsHistories;
};
