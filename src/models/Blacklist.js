export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', { tokenGen: DataTypes.TEXT, }, {});
  Blacklist.associate = () => {
    // associations can be defined here
  };
  return Blacklist;
};
