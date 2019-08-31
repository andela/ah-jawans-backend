import model from '../../models';

const { User } = model;


const findUser = id => User.findOne({ where: { id } });

const findUserData = object => User.findOne(object);

const findUserExist = async (username, email) => {
  const check1 = username ? (!!(await findUserData({ where: { username } }))) : false;
  const check2 = email ? (!!(await findUserData({ where: { email } }))) : false;
  return { check1, check2 };
};

const updateUser = async (id, username, email, firstName,
  lastName, bio, image, dateOfBirth, gender) => {
  const userData1 = await findUserData({ where: { id } });

  const user = await User.update({ username: username || userData1.dataValues.username,
    email: email || userData1.dataValues.email,
    firstName: firstName || userData1.dataValues.firstName,
    lastName: lastName || userData1.dataValues.lastName,
    bio: bio || userData1.dataValues.bio,
    image: image || userData1.dataValues.image,
    dateOfBirth: dateOfBirth || userData1.dataValues.dateOfBirth,
    gender: gender || userData1.dataValues.gender }, { where: { id } });
  return user;
};

export {
  findUser,
  findUserData,
  findUserExist,
  updateUser
};
