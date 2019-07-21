import models from '../../models';

const { Articles } = models;

// eslint-disable-next-line require-jsdoc
export default class ReadingStatsHelper {
// eslint-disable-next-line require-jsdoc
  static async updateStatistic(id) {
    try {
      const articleToUpdate = await Articles.findOne({ where: { id: Number(id) } });
      if (articleToUpdate) {
        await Articles.update({ readers: articleToUpdate.dataValues.readers + 1 },
          { where: { id: Number(id) } });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
