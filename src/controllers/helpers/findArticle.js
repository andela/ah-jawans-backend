import model from '../../models';

const { Articles } = model;

const findArticle = ArticleId => Articles.findOne({ where: { id: ArticleId } });


export default findArticle;
