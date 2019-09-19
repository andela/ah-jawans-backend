module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', { body: DataTypes.TEXT,
    articleId: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'User',
        key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' },
    edited: { type: DataTypes.BOOLEAN } }, { timestamps: true });
  Comments.associate = (models) => {
    Comments.belongsTo(models.Articles, { foreignKey: 'articleId',
      onDelete: 'CASCADE' });
    Comments.belongsTo(models.User, { foreignKey: 'userId',
      onDelete: 'CASCADE' });
    Comments.hasMany(models.LikeAndDislike, { as: 'Comment',
      foreignKey: 'commentId' });
  };
  return Comments;
};
