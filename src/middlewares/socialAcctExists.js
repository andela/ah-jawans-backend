import models from '../models';
import tokenGeneration from '../helpers/tokenGenerator';

const userExists = {
  async google(req, res, next) {
    const { emails, displayName } = req.user;
    const currentUser = await models.User.findOne({
      where: {
        email: emails[0].value,
      },
    });
    if (currentUser) {
      const token = await tokenGeneration.generateToken(currentUser.dataValues);
      const {
        firstName, lastName, email
      } = currentUser;
      return res.status(201).json({
        message: `Welcome to Authors Haven ${displayName}`,
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
    const currentUser = await models.User.findOne({
      where: {
        socialId: req.user.id
      },
    });
    if (currentUser) {
      const token = await tokenGeneration.generateToken(currentUser.dataValues);
      const {
        socialId
      } = currentUser;
      return res.status(201).json({
        message: `Welcome to Authors Haven ${displayName}`,
        data: {
          token,
          socialId
        },
      });
    }
    next();
  },
};
export default userExists;
