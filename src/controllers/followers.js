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
      if (!findUser) return res.status(404).json({ error: 'Username not found' });
      if (findUser.id === req.user.id) return res.status(400).json({ error: 'You can not follow yourself' });

      // const followedUser = await checkUser(findUser.id);
      // eslint-disable-next-line max-len
      const checkFollowed = await Follow.findOne({ where: { followed: findUser.id, userId: req.user.id } });

      if (checkFollowed) return res.status(409).json({ error: `Already following ${findUser.username}` });
      await follow(findUser.id, req.user.id);
      return res.status(201).json({ message: `Following ${findUser.username}`,
        username: findUser.username,
        bio: findUser.bio,
        image: findUser.image,
        following: findUser.following });
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
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
      if (!findUser) return res.status(404).json({ error: 'Username not found' });
      const followedUser = await checkUser(findUser.id);
      return followedUser ? await unfollowUser(userId, findUser.id) && res.status(200).json({ message: `Unfollowed ${findUser.username}`,
        username: findUser.username,
        bio: findUser.bio,
        image: findUser.image,
        following: findUser.following })
        : res.status(404).json({ errors: { follow: `Not following "${findUser.username}"` } });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
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
          attributes: ['id', 'username', 'firstName', 'lastName', 'email',
            'image', 'dateOfBirth', 'bio', 'following'] }] });
      return followers.length
        ? res.status(200).json({ message: 'Followers',
          followers })
        : res.status(404).json({ error: { follows: 'No followers found!' } });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
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
          attributes: ['id', 'username', 'firstName', 'lastName', 'email',
            'image', 'dateOfBirth', 'bio', 'following'] }] });
      return following.length
        ? res.status(200).json({ message: 'Following',
          following })
        : res.status(404).json({ error: { follows: "You don't follow anyone" } });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}
