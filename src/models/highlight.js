export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', { userId: { type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'user', key: 'id' } },
  articleId: { type: DataTypes.INTEGER,
    allowNull: false },
  indexStart: { type: DataTypes.INTEGER, allowNull: false },
  indexEnd: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
  elementId: { type: DataTypes.STRING },
  highlighted: { type: DataTypes.BOOLEAN } },
  { tableName: 'Highlight' }, {});
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.Articles, { foreignKey: 'articleId',
      as: 'article',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });

    Highlight.belongsTo(models.User, { foreignKey: 'userId',
      as: 'user',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };
  return Highlight;
};
