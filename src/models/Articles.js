export default (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', { slug: { type: String,
    unique: true,
    required: true, },
  title: { type: String,
    unique: false,
    required: true, },
  description: { type: String,
    unique: false,
    required: true, },
  body: { type: DataTypes.TEXT,
    unique: false,
    required: true, },
  image: { type: String,
    unique: false,
    required: false, },
  tagList: { type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true },
  readtime: { type: DataTypes.STRING,
    allowNull: false }, },
  { timestamps: true,
    tableName: 'Articles' });

  Articles.associate = (models) => {
  // associations can be defined here
    Articles.belongsTo(models.User, { as: 'author',
      fareignkey: 'authorId',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
    Articles.hasMany(models.Rating, { foreignKey: 'articleId', allowNull: false });
  };
  return Articles;
};
