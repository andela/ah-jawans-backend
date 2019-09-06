export default (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    { username: { type: String, unique: true, required: true },
      firstName: { allowNull: true, type: String },
      lastName: { allowNull: true, type: String },
      email: { type: String, lowercase: true, unique: true, required: true },
      bio: { type: String },
      image: { type: String },
      following: { type: String },
      socialId: { type: String },
      verified: { type: Boolean },
      password: { type: String },
      createdAt: { allowNull: true, type: Date },
      updatedAt: { allowNull: true, type: Date },
      dateOfBirth: { allowNull: true, type: Date },
      gender: { type: String },
      provider: { type: String },
      roles: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true } },
    { timestamps: true, tableName: 'User' });

  User.associate = (models) => {
    User.hasMany(models.Rating, { foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE' });
    User.hasMany(models.Comments, { foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE' });
    User.hasMany(models.Opt, { foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE' });
  };
  return User;
};
