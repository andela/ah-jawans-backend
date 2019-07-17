export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', { tokenGen: DataTypes.TEXT, },
    { tableName: 'Blacklist' }, {});
  Blacklist.associate = () => {
    // associations can be defined here
  };

  return Blacklist;
};
