module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', { type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    resource: DataTypes.STRING,
    resourceId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING }, {});
  Notification.association = (models) => {
    Notification.belongsTo(models.User, { as: 'userFkey',
      foreignkey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' });
  };
  return Notification;
};
