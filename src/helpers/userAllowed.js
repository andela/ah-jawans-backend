import model from '../models';


const { Permissions } = model;

const checkAction = async (role, actions, tablesAllowed) => {
  const roles = await Permissions.findAll({ where: { role, actions } });
  return roles.length ? roles[0].dataValues.tablesAllowed.includes(tablesAllowed) : false;
};

export default checkAction;
