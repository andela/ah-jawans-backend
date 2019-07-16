export default (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', { userId: { type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true },
  followed: { type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true } },
  { timestamps: true,
    tableName: 'Follow' });
  Follow.associate = (models) => {
    Follow.belongsTo(models.User, { foreignKey: 'userId',
      as: 'follower',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
    Follow.belongsTo(models.User, { foreignKey: 'followed',
      as: 'followedUser',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };
  return Follow;
};
