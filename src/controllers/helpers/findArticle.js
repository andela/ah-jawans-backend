import model from '../../models';

const { Articles } = model;

const findArticle = async (ArticleId) => {
  const oneArticle = await Articles.findOne({ where: { id: ArticleId } });
  return oneArticle;
};

export default findArticle;
