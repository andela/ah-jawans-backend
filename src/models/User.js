export default (sequelize) => {
  const User = sequelize.define(
    'User', { username: { type: String,
      unique: true,
      required: true, },
    firstName: { allowNull: true,
      type: String },
    lastName: { allowNull: true,
      type: String },
    email: { type: String,
      lowercase: true,
      unique: true,
      required: true, },
    bio: { type: String },
    image: { type: String },
    following: { type: String },
    socialId: { type: String },
    verified: { type: Boolean },
    password: { type: String },
    createdAt: { allowNull: true,
      type: Date },
    updatedAt: { allowNull: true,
      type: Date },
    dateOfBirth: { allowNull: true,
      type: Date },
    gender: { type: String },
    provider: { type: String },
    role: { type: String }, },
    { timestamps: true,
      tableName: 'User' }
  );

  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
