export default (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    'Follow', { userId: { type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'User',
        key: 'id' },
      followed: { type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'User',
          key: 'id' } }, } },
    { timestamps: true,
      tableName: 'Follow' }
  );
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
