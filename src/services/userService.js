 /* eslint-disable require-jsdoc */
import database from '../models';

export default class UserService {
  static async getUser(email) {
    try {
      const user = await database.User.findOne({
        where: { email: String(email) }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}