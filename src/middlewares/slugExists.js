import models from '../models';

const { Articles } = models;

const slugExist = async (req, res, next) => {
  const { slug } = req.params;
  const currentArticle = await Articles.findOne({ where: { slug } });
  if (currentArticle) {
    req.article = currentArticle;
    next();
  } else {
    return res.status(404).send({ status: 404,
      error: { message: 'The article does not exist!!!' } });
  }
};

export default slugExist;
