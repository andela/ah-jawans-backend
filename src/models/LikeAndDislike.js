export default (sequelize, DataTypes) => {
  const LikeAndDislike = sequelize.define('LikeAndDislike', { userId: DataTypes.INTEGER,
    likes: DataTypes.BOOLEAN,
    dislikes: DataTypes.BOOLEAN,
    articleId: DataTypes.INTEGER },
  { tableName: 'LikeAndDislike' }, {});

  LikeAndDislike.associate = (models) => {
    LikeAndDislike.belongsTo(models.Articles, { foreignKey: 'articleId',
      as: 'article',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };

  return LikeAndDislike;
};
