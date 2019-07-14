export default (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'Articles', { slug: { type: String,
      unique: true,
      required: true, },
    title: { type: String,
      unique: false,
      required: true, },
    description: { type: String,
      unique: false,
      required: true, },
    body: { type: String,
      unique: false,
      required: true, },
    image: { type: String,
      unique: false,
      required: false, },
    authorId: { type: DataTypes.INTEGER,
      unique: true,
      required: true, } },
    { timestamps: true,
      tableName: 'Articles' }
  );

  Articles.associate = (models) => {
    // associations can be defined here
    Articles.belongsTo(models.User, { as: 'author',
      fareignkey: 'authorId',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };
  return Articles;
};
