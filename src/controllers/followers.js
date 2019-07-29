import models from '../models';
import { follow, getUser, checkUser, unfollowUser } from './helpers/followersHelper';

const { User, Follow } = models;
/**
 * @description CRUD for followers
 * @author: Patrick Ngabonziza
 */
export default class FollowerController {
  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Follow a user
     */
  static async followUser(req, res) {
    try {
      const { username } = req.params;
      const findUser = await getUser(username);
      if (!findUser) return res.status(404).json({ status: 404, message: 'Username not found' });
      if (findUser.id === req.user.id) return res.status(400).json({ status: 400, message: 'You can not follow yourself' });

      const followedUser = await checkUser(findUser.id);
      if (followedUser) return res.status(409).json({ status: 409, message: `Already following ${findUser.username}` });
      await follow(findUser.id, req.user.id);
      return res.status(201).json({ status: 201,
        message: `Following ${findUser.username}`,
        username: findUser.username,
        bio: findUser.bio,
        image: findUser.image,
        following: findUser.following });
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Unfollow user
     */
  static async unfollowUser(req, res) {
    const { username } = req.params;
    const userId = req.user.id;
    try {
      const findUser = await getUser(username);
      if (!findUser) return res.status(404).json({ status: 404, message: 'Username not found' });
      const followedUser = await checkUser(findUser.id);
      return followedUser ? await unfollowUser(userId, findUser.id)
      && res.status(200).json({ status: 200,
        message: `Unfollowed ${findUser.username}`,
        username: findUser.username,
        bio: findUser.bio,
        image: findUser.image,
        following: findUser.following })
        : res.status(404).json({ status: 404, message: { follow: `Not following "${findUser.username}"` } });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Server error' });
    }
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} List of followers
     */
  static async followers(req, res) {
    try {
      const followers = await Follow.findAll({ where: { followed: req.user.id },
        include: [{ model: User,
          as: 'follower',
          attributes: ['id', 'username', 'email',
            'image', 'bio', 'following'] }] });
      return followers.length
        ? res.status(200).json({ status: 200,
          message: 'Followers',
          followers })
        : res.status(404).json({ status: 404, message: { follows: 'No followers found!' } });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Server error' });
    }
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} List of following users
     */
  static async following(req, res) {
    try {
      const following = await Follow.findAll({ where: { userId: req.user.id },
        include: [{ model: User,
          as: 'followedUser',
          attributes: ['id', 'username', 'email',
            'image', 'bio', 'following'] }] });
      return following.length
        ? res.status(200).json({ status: 200,
          message: 'Following',
          following })
        : res.status(404).json({ status: 404, message: { follows: "You don't follow anyone" } });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Server error' });
    }
  }
}
