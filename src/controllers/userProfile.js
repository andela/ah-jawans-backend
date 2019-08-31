/* eslint-disable require-jsdoc */
/* eslint-disable no-cond-assign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import models from '../models';
import { findUserData, findUserExist, updateUser } from './helpers/findUser';

const { User } = models;
/**
  * This class contains user controllers
  */
class UserProfile {
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
    try {
      console.log('oooooooo');
      const userId = req.user.id;
      const { id } = req.query;
      const { username, email, firstName, lastName, bio, dateOfBirth, gender } = req.body;
      const image = req.files && req.files[0].originalname
        ? `${req.files[0].version}/${req.files[0].public_id}.${req.files[0].format}`
        : null;
      if (userId) {
        const userData = await findUserData({ where: { id: userId } });
        if (!userData) return res.status(403).json({ error: 'User does not exist' });
        if (userData.dataValues.roles.includes('superAdmin')) {
          if (id === userId) return res.status(404).json({ error: 'Not allowed to update super admin' });
          const userData1 = await findUserData({ where: { id } });
          if (!userData1) return res.status(403).json({ error: 'User does not exist' });
          const check = await findUserExist(username, email);
          if (check.check1 || check.check2) return res.status(409).json({ error: 'email or username is already used' });
          return updateUser(id, username, email, firstName, lastName, bio,
            image, dateOfBirth, gender) && res.status(200).json({ message: 'User successfully updated!' });
        } else {
          if (id === userId) return res.status(404).json({ message: 'Not allowed to update super admin' });
          const userData1 = await findUserData({ where: { id: userId } });
          if (!userData1) return res.status(403).json({ message: 'User does not exist' });
          const check = await findUserExist(username, email);
          if (check.check1 || check.check2) return res.status(409).json({ error: 'email or username is already used' });
          return updateUser(userId, username, email, firstName, lastName, bio, image, dateOfBirth, gender) && res.status(200).json({ message: 'User successfully updated!' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error!' });
    }
  }

  static async getAllUser(req, res) {
    const usersList = await User.findAll({ attributes: ['firstName', 'lastName', 'bio', 'image', 'following', 'createdAt', 'updatedAt'] });
    // eslint-disable-next-line no-unused-expressions
    res.status(200).json({ usersList });
  }
}

export default UserProfile;
