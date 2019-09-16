module.exports = { up: (queryInterface, Sequelize) => queryInterface.addColumn('Highlight', 'elementId', { type: Sequelize.STRING,
  allowNull: true }),
down: queryInterface => queryInterface.removeColumn('Highlight', 'elementId') };
