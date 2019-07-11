module.exports = { up: (queryInterface, Sequelize) => queryInterface.createTable('Blacklists', { id: { allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER },
tokenGen: { type: Sequelize.TEXT, },
createdAt: { allowNull: false,
  type: Sequelize.DATE },
updatedAt: { allowNull: false,
  type: Sequelize.DATE } }),
// eslint-disable-next-line no-unused-vars
down: (queryInterface, Sequelize) => queryInterface.dropTable('Blacklists'), };
