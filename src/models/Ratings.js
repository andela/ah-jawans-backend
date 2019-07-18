export default (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Rating',
    { reviewerId: { type: DataTypes.INTEGER,
      allowNull: false },
    articleId: { type: DataTypes.INTEGER,
      allowNull: false },
    rate: { type: DataTypes.INTEGER,
      allowNull: false } },
    {});
  Ratings.associate = (models) => {
    // associations can be defined here
    Ratings.belongsTo(models.User, { foreignKey: 'reviewerId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Ratings.belongsTo(models.Articles, { foreignKey: 'articleId', as: 'article', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return Ratings;
};
