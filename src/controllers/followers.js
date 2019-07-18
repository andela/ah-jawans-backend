import models from '../models';

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
      const checkUser = await User.findOne({ where: { username: String(username) } });
      if (!checkUser) return res.status(404).json({ error: 'Username not found' });
      if (checkUser.id === req.user.id) return res.status(400).json({ error: 'You can not follow yourself' });

      const isUserFollowed = await Follow.findOne({ where: { followed: checkUser.id } });
      if (isUserFollowed) return res.status(409).json(`Already following ${username}`);

      await Follow.create({ followed: checkUser.id,
        userId: req.user.id });

      return res.status(201).json({ message: `Following ${checkUser.username}` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Unfollow user
     */
  static async unFollowUser(req, res) {
    const [username, user] = [req.params.username, req.user];
    const checkUser = await User.findOne({ where: { username: String(username) } });
    if (!checkUser) return res.status(404).json({ error: 'Username not found' });
    const unFollowed = Object.keys(checkUser).length
      ? await Follow.destroy({ where: { userId: user.id, followed: checkUser.id } }) : null;

    if (unFollowed && unFollowed.errors) return res.status(500).json({ errors: 'Server error! Something went wrong!' });
    return unFollowed
      ? res.status(200).json({ message: `Unfollowed ${username}` })
      : res.status(404).json({ errors: { follow: `You are not following "${username}"` } });
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} List of followers
     */
  static async followers(req, res) {
    const followers = await Follow.findAll({ where: { followed: req.user.id } });
    return followers.length
      ? res.status(200).json({ message: 'Followers',
        followers })
      : res.status(404).json({ errors: { follows: "You don't have followers" } });
  }

  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} List of following users
     */
  static async following(req, res) {
    const following = await Follow.findAll({ where: { userId: req.user.id } });
    return following.length
      ? res.status(200).json({ message: 'Following',
        following })
      : res.status(404).json({ errors: { follows: "You don't follow anyone" } });
  }
}
