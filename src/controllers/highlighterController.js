/* eslint-disable require-jsdoc */
import model from '../models';
import findArticle from './helpers/findArticle';
import validations from '../helpers/validation';

const { Highlight } = model;

class Highlighter {
  static async createHighlight(req, res) {
    const { id } = req.user;
    const { articleId } = req.params;
    const { indexStart, indexEnd, comment } = req.body;
    const highlighted = true;

    await validations.ValidationSchema.highlight(req.body);
    if (validations.errors.length) return res.status(400).json({ errors: validations.errors });
    try {
      const article = await findArticle(articleId);
      if (!article) return res.status(404).json({ message: 'Article not found' });
      const highlightText = article.body.slice(indexStart, indexEnd);

      const highlightedText = await Highlight.findOne({ where: { userId: id,
        articleId,
        text: highlightText } });

      if (highlightedText) return res.status(409).json({ message: 'Already highlighted' });

      const commentOnHighlight = await Highlight.create({ userId: id,
        indexStart,
        indexEnd,
        text: highlightText,
        articleId,
        comment,
        highlighted });

      return res.status(201).json({ highlightedText: commentOnHighlight.text,
        Comment: commentOnHighlight.comment });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default Highlighter;
