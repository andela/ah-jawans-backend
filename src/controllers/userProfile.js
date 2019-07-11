/* eslint-disable no-cond-assign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import models from '../models';

const { User } = models;
/**
  * This class contains user controllers
  */
class userProfile {
  /**
    * @param  {object} req
    * @param  {object} res
    * @return {object} returns an object containing the user profile
    */
  static async getProfile(req, res) {
    const { username } = req.params;
    const queryResult = await User.findOne({ where: { username } });
    if (!queryResult) {
      return res.status(404).json({ message: `Username: ${username} does not exist` });
    }
    const profile = queryResult.dataValues;

    return res.status(200).json({ profile });
  }

  /**
    * @param  {object} req
    * @param  {object} res
    * @return {object} returns an object containing the updated user profile
    */
  static async updateProfile(req, res) {
    const { username } = req.params;
    const { body } = req;
    const getUsername = await User.findOne({ where: { username } });
    // eslint-disable-next-line no-undef
    if (!getUsername) {
      return res.status(404).json({ message: `Username: ${username} does not exist` });
      // eslint-disable-next-line no-else-return
    } else if (req.body.id !== getUsername.dataValues.id) {
      return res.status(404).json({ message: `UserId: ${req.body.id} cannot be amended, You can only amend your id` });
    } else {
      const updatedUser = await User.update(
        { ...body },
        { where: { id: req.body.id } },
      );
      return updatedUser.length
        ? res.status(200).json({ user: { message: 'User Id: updated sucessfully', updatedUser } })
        : res.status(404).json({ message: 'Could not find user' });
    }
  }
}

export default userProfile;
