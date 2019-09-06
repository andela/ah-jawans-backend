module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', { type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    resource: DataTypes.STRING,
    resourceId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING }, {});
  return Notification;
};
