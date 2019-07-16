import models from '../models';

const { User } = models;

const findUser = async (username) => {
  const { dataValues } = await User.findOne({ where: { username } });
  return dataValues || {};
};
export default findUser;
