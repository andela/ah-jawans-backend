module.exports = { up: (queryInterface, Sequelize) => queryInterface.createTable('Permissions', { role: { type: Sequelize.STRING },
  actions: { allowNull: false, type: Sequelize.STRING },
  tablesAllowed: { allowNull: false, type: Sequelize.ARRAY(Sequelize.STRING) },
  createdAt: { allowNull: true,
    type: Sequelize.DATE },
  updatedAt: { allowNull: true,
    type: Sequelize.DATE } })
  .then(() => {
    queryInterface.sequelize.query('ALTER TABLE "Permissions" ADD CONSTRAINT "permissions-pks" PRIMARY KEY ("role", "actions")');
  }),
down: queryInterface => queryInterface.dropTable('Permissions') };
