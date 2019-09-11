import { Op } from 'sequelize';
import model from '../../models';

const { User } = model;

const searchUserHelper = async (authorName, offset, limit) => {
  let users;
  if (offset && limit) {
    users = await User.findAll({ offset,
      limit,
      where: { [Op.or]: [
        { username: { [Op.iLike]: `%${authorName}%` } },
        { lastName: { [Op.iLike]: `%${authorName}%` } },
        { firstName: { [Op.iLike]: `%${authorName}%` } }
      ] } });
  } else {
    users = await User.findAll({ where: { [Op.or]: [
      { username: { [Op.iLike]: `%${authorName}%` } },
      { lastName: { [Op.iLike]: `%${authorName}%` } },
      { firstName: { [Op.iLike]: `%${authorName}%` } }
    ] } });
  }

  return users;
};

export default searchUserHelper;
