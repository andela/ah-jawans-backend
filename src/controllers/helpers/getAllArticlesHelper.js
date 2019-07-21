
import model from '../../models';

const { Articles } = model;
const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll();
    return Articles.findAll() && res.status(200).json({ articles });
  } catch (error) {
    return res.status(404).json({ error: 'No article found' });
  }
};

const articlePagination = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const articles = await Articles.findAll({ offset, limit });
    return articles.length ? res.status(200).json({ articles }) : res.status(404).json({ message: 'page not found' });
  } catch (error) {
    return res.status(404).json({ error: 'No article found' });
  }
};

export {
  getAllArticles,
  articlePagination
};
