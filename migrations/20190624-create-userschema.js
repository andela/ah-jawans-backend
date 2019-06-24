'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
        username: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      favorites: {
        type: Sequelize.STRING,
        allowNull: true
      },
      following: {
        type: Sequelize.STRING,
        allowNull: false

      },
      hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      timestamps: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};