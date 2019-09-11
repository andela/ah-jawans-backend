/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import notifyComment from './notifyComment';
import models from '../../models';
import favouritedBy from '../mail/Favourites';

const { Comments, LikeAndDislike, Articles, User } = models;
dotenv.config();

const commentArticle = async (comment) => {
  try {
    const author = await Articles.findOne({ where: { id: comment.articleId } });
    const url = `${process.env.BASE_URL}/api/articles/${comment.articleId}/comments`;
    console.log(url, 'url of the comment');
    const favourites = await LikeAndDislike.findAll({ where: { articleId: comment.articleId } });
    if (favourites) {
      favourites.forEach(async (fav) => {
        const user = await favouritedBy(fav.userId);
        const commentid = await Comments.findOne({ where: { id: comment.id } });
        const userCommented = await favouritedBy(commentid.userId);
        const inAppMessage = `Dear ${user.firstName}, ${userCommented.firstName} ${userCommented.lastName} commented on the article you liked!
       `;
        const emailMessage = `
       Hello ${user.firstName}, ${userCommented.firstName} ${userCommented.lastName} commented on the article you liked! <br>
       Please click below to read the comment: <br><br><br>
       <a href='${process.env.BASE_URL}/api/articles/${comment.articleId}/comments'>View all comments</a>
       <br>
       `;
        const data = { resource: 'articles',
          action: 'comment',
          user: fav.dataValues,
          inAppMessage,
          emailMessage,
          url };
        const res = await notifyComment(data);
        return res;
      });
    }
  } catch (err) {
    return { errors: err };
  }
};

export default commentArticle;
