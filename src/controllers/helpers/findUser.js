import model from '../../models';

const { User } = model;


const findUser = async (id) => {
  const { dataValues } = await User.findOne({ where: { id } });
  return dataValues || {};
};

export default findUser;
