import model from '../../models';

const { Highlight } = model;

const getHightlights = async (articleId) => {
  const highlights = await Highlight.findAll({ where: { articleId }, attributes: ['text', 'comment'] });
  return highlights;
};

const updateHightlights = async (articleId) => {
  const highlights = await Highlight.update({ highlighted: false }, { where: { articleId } });
  return highlights;
};

export {
  getHightlights,
  updateHightlights
};
