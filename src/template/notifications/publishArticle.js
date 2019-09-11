/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import notify from './Notify';
import models from '../../models';

const { User, Follow } = models;
dotenv.config();

export default async (authorId, articleId) => {
  try {
    const author = await User.findOne({ where: { id: authorId } });
    const url = `${process.env.FRONT_END_URL}/readArticle/${articleId}`;
    const followers = await Follow.findAll({ where: { followed: authorId } });
    followers.forEach(async (follower) => {
      const user = await User.findOne({ where: { id: follower.dataValues.userId } });
      const inAppMessage = `Hello ${user.dataValues.firstName}, ${author.dataValues.firstName} ${author.dataValues.lastName} published a new article`;
      const emailMessage = `Hello ${user.dataValues.firstName}, ${author.dataValues.firstName} ${author.dataValues.lastName} published a new article<br>
         <br>
         <a href='${url}'>Read an article</a> `;
      const data = { resource: 'articles',
        action: 'publish',
        user: follower.dataValues,
        inAppMessage,
        emailMessage,
        url };
      const res = await notify(data);
      return res;
    });
  } catch (error) {
    return { errors: error };
  }
};
