

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    username: {
      allowNull: false,
      autoIncrement: false,
      unique: true,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    following: {
      type: Sequelize.STRING,
      allowNull: true

    },
    timestamps: {
      allowNull: true,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
