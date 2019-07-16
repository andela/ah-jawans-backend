module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', { body: DataTypes.TEXT,
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.Articles, { foreignKey: 'articleId',
      onDelete: 'CASCADE' });
  };
  return Comments;
};
