/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { Op } from 'sequelize';
import model from '../../models';

const { Articles, User } = model;
const searchArticlesHelper = async (tag, keyword, title, user, offset, limit) => {
  let articlesArray = [];
  if (offset && limit) {
    if (user.length) {
      const articles = [];
      for (let i = 0; i < user.length; i++) {
        articlesArray = articles.concat(await Articles.findAll({ offset,
          limit,
          where: { [Op.or]: [
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
            'id',
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
      articlesArray = await Articles.findAll({ offset,
        limit,
        where: { [Op.or]: [
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
          'id',
          'slug',
          'title',
          'description',
          'body',
          'tagList',
          'readtime',
          'updatedAt',
          'createdAt'
        ] });
    }
  } else if (user.length) {
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
        'id',
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
      'id',
      'slug',
      'title',
      'description',
      'body',
      'tagList',
      'readtime',
      'updatedAt',
      'createdAt'
    ] });
  }

  return articlesArray;
};

const articleCount = async (tag, keyword, title, user) => {
  let articles;
  if (user.length) {
    for (let i = 0; i < user.length; i++) {
      articles = await Articles.count({ where: { [Op.or]: [
        { title: { [Op.iLike]: `%${title}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } },
        { body: { [Op.iLike]: `%${keyword}%` } },
        { tagList: { [Op.contains]: [tag] } },
        { authorId: user[i].dataValues.id }
      ] }, });
    }
  } else {
    articles = await Articles.count({ where: { [Op.or]: [
      { title: { [Op.iLike]: `%${title}%` } },
      { description: { [Op.iLike]: `%${keyword}%` } },
      { body: { [Op.iLike]: `%${keyword}%` } },
      { tagList: { [Op.contains]: [tag] } },
    ] }, });
  }

  return articles;
};

export { articleCount, searchArticlesHelper };
