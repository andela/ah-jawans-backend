import models from '../../models';

const { User } = models;

const favouritedBy = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  return user ? user.dataValues : {};
};

export default favouritedBy;
