export default (sequelize, DataTypes) => {
  const Bookmarks = sequelize.define('Bookmarks', { userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER }, {});
  Bookmarks.associate = (models) => {
    Bookmarks.belongsTo(models.User, { foreignKey: 'userId',
      as: 'user',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
    Bookmarks.belongsTo(models.Articles, { foreignKey: 'articleId',
      as: 'article',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };

  return Bookmarks;
};
