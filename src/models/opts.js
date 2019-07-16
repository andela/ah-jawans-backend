module.exports = (sequelize, DataTypes) => {
  const Opt = sequelize.define('Opt', { userId: DataTypes.INTEGER,
    resource: DataTypes.STRING,
    type: DataTypes.STRING,
    resourceId: DataTypes.INTEGER }, {});
  return Opt;
};
