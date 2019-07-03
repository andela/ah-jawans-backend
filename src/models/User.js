module.exports = (sequelize) => {
  const User = sequelize.define(
    'user', {
      username: {
        type: String,
        unique: true,
        required: true
      },
      mail: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
      },
      bio: {
        type: String
      },
      image: {
        type: String
      },
      favorites: {
        type: String
      },
      following: {
        type: String
      },
      hash: {
        type: String
      },
      salt: {
        type: String
      },

    },
    { timestamps: true }
  );

  user.associate = (models) => {
    // associations can be defined here
  };
  return User;
}; 
