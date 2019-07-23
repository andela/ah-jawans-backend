import model from '../../models';

const { Articles, Bookmarks } = model;

const ArticleOwner = async (articleId, userId) => {
  const article = await Articles.findOne({ where: { id: articleId } });
  return (userId === article.dataValues.authorId) ? 1 : 0;
};

const findArticle = id => Articles.findOne({ where: { id } });

const findOneArticle = async (req, res, object) => {
  try {
    const article = await Articles.findOne(object);
    if (article) return res.status(200).json({ article });
    res.status(404).json({ message: 'No article found!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', });
  }
};

const findBookmark = (id, bookmarkId) => Bookmarks.findOne({ where:
  { userId: id, id: bookmarkId } });
export {
  ArticleOwner,
  findArticle,
  findBookmark,
  findOneArticle
};
