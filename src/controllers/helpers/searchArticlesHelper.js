/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { Op } from 'sequelize';
import model from '../../models';

const { Articles, User } = model;
const searchArticlesHelper = async (tag, keyword, title, user) => {
  let articlesArray = [];
  if (user.length) {
    const articles = [];
    for (let i = 0; i < user.length; i++) {
      articlesArray = articles.concat(await Articles.findAll({ where: { [Op.or]: [
        { title: { [Op.iLike]: `%${title}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } },
        { body: { [Op.iLike]: `%${keyword}%` } },
        { tagList: { [Op.contains]: [tag] } },
        { authorId: user[i].dataValues.id }
      ] },
      include: [
        { as: 'author',
          model: User,
          attributes: ['username', 'bio', 'image'] }
      ],
      attributes: [
        'slug',
        'title',
        'description',
        'body',
        'tagList',
        'updatedAt',
        'createdAt'
      ] }));
    }
  } else {
    articlesArray = await Articles.findAll({ where: { [Op.or]: [
      { title: { [Op.iLike]: `%${title}%` } },
      { description: { [Op.iLike]: `%${keyword}%` } },
      { body: { [Op.iLike]: `%${keyword}%` } },
      { tagList: { [Op.contains]: [tag] } },
    ] },
    include: [
      { as: 'author',
        model: User,
        attributes: ['username', 'bio', 'image'] }
    ],
    attributes: [
      'slug',
      'title',
      'description',
      'body',
      'tagList',
      'updatedAt',
      'createdAt'
    ] });
  }
  return articlesArray;
};

export default searchArticlesHelper;
