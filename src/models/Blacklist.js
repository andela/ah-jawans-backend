export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', {
    token: DataTypes.TEXT,
  }, {});
  Blacklist.associate = () => {
    // associations can be defined here
  };
  return Blacklist;
};
