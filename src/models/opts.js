module.exports = (sequelize, DataTypes) => {
  const Opt = sequelize.define('Opt', { userId: DataTypes.INTEGER,
    resource: DataTypes.STRING,
    type: DataTypes.STRING,
    resourceId: DataTypes.INTEGER },
  { timestamps: true, tableName: 'Opts' });
  Opt.associate = (models) => {
    Opt.belongsTo(models.User, { as: 'userFkey',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };
  return Opt;
};
