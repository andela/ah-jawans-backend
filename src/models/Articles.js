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
  readers: { type: DataTypes.INTEGER,
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
    Articles.hasMany(models.Rating, { as: 'ratings', foreignKey: 'articleId', allowNull: false });
    Articles.hasMany(models.Bookmarks, { foreignKey: 'articleId' });
    Articles.hasMany(models.LikeAndDislike, { as: 'likes', foreignKey: 'articleId', sourceKey: 'slug' });
    Articles.hasMany(models.Comments, { as: 'Comments', foreignKey: 'articleId', sourceKey: 'id' });
  };
  return Articles;
};
