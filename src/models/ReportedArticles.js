

export default (sequelize, DataTypes) => {
  const ReportedArticles = sequelize.define('ReportedArticles',
    { articleId: { type: DataTypes.INTEGER,
      allowNull: false },
    userId: { type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: { model: 'Articles',
        key: 'id' } },
    comment: { type: DataTypes.STRING,
      allowNull: false },
    reportType: { type: DataTypes.STRING,
      allowNull: false } }, {});
  ReportedArticles.associate = (models) => {
    ReportedArticles.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    ReportedArticles.belongsTo(models.Articles, { foreignKey: 'articleId', as: 'article', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return ReportedArticles;
};
