
module.exports = { up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', { id: { allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER },
body: { type: Sequelize.TEXT },
articleId: { type: Sequelize.INTEGER },
userId: { type: Sequelize.INTEGER },
createdAt: { allowNull: false,
  type: Sequelize.DATE },
updatedAt: { allowNull: false,
  type: Sequelize.DATE } }),
down: queryInterface => queryInterface.dropTable('Comments') };
