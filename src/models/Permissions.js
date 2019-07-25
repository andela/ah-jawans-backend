module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', { role: { type: DataTypes.STRING,
    allowNull: false },
  tablesAllowed: { type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false },
  actions: { type: DataTypes.STRING,
    allowNull: false } }, {});
  Permissions.removeAttribute('id');
  return Permissions;
};
