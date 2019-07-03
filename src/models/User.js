export default (sequelize) => {
  const User = sequelize.define(
    'User', {
      username: {
        type: String,
        unique: true,
        required: true,
      },
      firstName: {
        allowNull: true,
        type: String
      },
      lastName: {
        allowNull: true,
        type: String
      },
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
      },
      bio: {
        type: String
      },
      image: {
        type: String
      },
      following: {
        type: String
      },
      password: {
        type: String
      },
      createdAt: {
        allowNull: true,
        type: Date
      },
      updatedAt: {
        allowNull: true,
        type: Date
      }

    },
    { timestamps: false }
  );

  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
