/* eslint-disable no-unused-expressions */
import helper from '../helpers/userAllowed';

const checkAction = tables => async (req, res, next) => {
  try {
    await helper(req.user.roles,
      req.method, tables)
      ? next() : res.status(403).json({ status: 403, message: 'Not allowed to perform the action' });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Server error' });
  }
};
export default checkAction;
