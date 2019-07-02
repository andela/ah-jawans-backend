import models from '../models';
import tokenGeneration from '../helpers/tokenGenerator';

const userInfo = {
  async googleLogin(req, res) {
    const { displayName } = req.user;
    const newUser = await models.user.create({
      username: req.user.name.givenName || req.user.name.familyName,
      mail: req.user.emails[0].value,
      image: req.user.photos[0].value,
    });
    if (newUser) {
      const {
        dataValues: {
          firstName, lastName, email
        }
      } = newUser;
      const token = await tokenGeneration.generateToken(newUser.dataValues);
      return res.status(201).json({
        status: 201,
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, firstName, lastName, email
        },
      });
    }
  },
  async facebookLogin(req, res) {
    const { displayName } = req.user;
    const names = displayName.split(' ');
    const newUser = await models.user.create({
      username: names[0] || names[1],
      mail: req.user.emails[0].value,
      image: req.user.photos[0].value,
    });
    if (newUser) {
      const {
        dataValues: {
          firstName, lastName, email
        }
      } = newUser;
      const token = await tokenGeneration.generateToken(newUser.dataValues);
      return res.status(201).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, firstName, lastName, email
        },
      });
    }
  },
  async twitterLogin(req, res) {
    const { displayName } = req.user;
    const names = displayName.split(' ');
    const newUser = await models.user.create({
      username: names[0] || names[1],
      image: req.user.photos[0].value,
    });
    if (newUser) {
      const {
        dataValues: {
          firstName, lastName, email
        }
      } = newUser;
      const token = await tokenGeneration.generateToken(newUser.dataValues);
      return res.status(201).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, firstName, lastName, email
        },
      });
    }
  },
};
export default userInfo;
