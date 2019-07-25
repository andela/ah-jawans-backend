import model from '../../models';


const { Permissions } = model;

const checkAction = async (role, actions) => (Permissions.findOne({ where: { role, actions } }));

export default checkAction;
