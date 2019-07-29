/* eslint-disable require-jsdoc */

import models from '../../models';

const { User, Follow } = models;

const follow = (followed, userId) => Follow.create({ followed, userId });

const getUser = username => User.findOne({ where: { username } });

const checkUser = followed => Follow.findOne({ where: { followed } });

const unfollowUser = (userId, followed) => Follow.destroy({ where: { userId, followed } });

export { follow, getUser, checkUser, unfollowUser };
