import model from '../../models';

const { Articles, Bookmarks } = model;

const ArticleOwner = async (articleId, userId) => {
  const article = await Articles.findOne({ where: { id: articleId } });
  return (userId === article.dataValues.authorId) ? 1 : 0;
};

const findArticle = id => Articles.findOne({ where: { id } });
const findBookmark = (id, bookmarkId) => Bookmarks.findOne({ where:
  { userId: id, id: bookmarkId } });
export {
  ArticleOwner,
  findArticle,
  findBookmark
};
