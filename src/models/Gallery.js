export default (sequelize, DataTypes) => {
  const Galleries = sequelize.define('Galleries',
    { id: { allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'User',
        key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' },
    image: { type: DataTypes.STRING,
      allowNull: false },
    createdAt: { allowNull: false,
      type: DataTypes.DATE },
    updatedAt: { allowNull: false,
      type: DataTypes.DATE } },
    {});
  Galleries.associate = (models) => {
    Galleries.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Galleries;
};
