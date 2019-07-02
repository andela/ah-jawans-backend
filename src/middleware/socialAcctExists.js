import models from '../models';
import tokenGeneration from '../helpers/tokenGenerator';

// eslint-disable-next-line no-unused-vars


const userExists = {
  async google(req, res, next) {
    const { emails, displayName } = req.user;
    const currentUser = await models.user.findAll({
      where: {
        mail: emails[0].value,
      },
    });
    if (currentUser.length > 0) {
      const token = await tokenGeneration.generateToken(currentUser[0].dataValues);
      const {
        firstName, lastName, email
      } = currentUser[0].dataValues;
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token,
          firstName,
          lastName,
          email
        },
      });
    }
    next();
  },
  async twitter(req, res, next) {
    const { displayName } = req.user;
    const currentUser = await models.user.findAll({
      where: {
        username: displayName[0].value,
      },
    });
    if (currentUser.length > 0) {
      const token = await tokenGeneration.generateToken(currentUser[0].dataValues);
      const {
        username
      } = currentUser[0].dataValues;
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token,
          username
        },
      });
    }
    next();
  },
};
export default userExists;
