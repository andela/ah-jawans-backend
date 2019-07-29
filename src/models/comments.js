module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', { body: DataTypes.TEXT,
    articleId: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'User',
        key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' } }, { timestamps: true });
  Comments.associate = (models) => {
    Comments.belongsTo(models.Articles, { as: 'Comments',
      foreignKey: 'articleId',
      onDelete: 'CASCADE' });
    Comments.belongsTo(models.User, { as: 'author',
      foreignKey: 'userId',
      onDelete: 'CASCADE' });
  };
  return Comments;
};
