import models from '../models';
import tokenGeneration from '../helpers/tokenGenerator';

const { User } = models;

const displayOutput = async (newUser, res, displayName) => {
  if (newUser) {
    const {
      dataValues: {
        firstName, lastName, username, email
      }
    } = newUser;
    const token = await tokenGeneration.generateToken(newUser.dataValues);
    return res.status(201).json({ message: `Welcome to Authors Haven ${displayName} `,
      data: { token, firstName, lastName, username, email }, });
  }
};

const userInfo = { async loginGoogle(req, res) {
  const { displayName } = req.user;
  const newUser = await User.create({ firstName: req.user.name.givenName,
    lastName: req.user.name.familyName,
    username: req.user.name.givenName || req.user.name.familyName,
    email: req.user.emails[0].value,
    image: req.user.photos[0].value,
    provider: req.user.provider, });
  await displayOutput(newUser, res, displayName);
},

async facebookLogin(req, res) {
  const { displayName } = req.user;
  const newUser = await User.create({ firstName: req.user.name.givenName,
    lastName: req.user.name.familyName,
    username: req.user.name.givenName || req.user.name.familyName,
    email: req.user.emails[0].value,
    image: req.user.photos[0].value,
    provider: req.user.provider, });
  await displayOutput(newUser, res, displayName);
},

async twitterLogin(req, res) {
  const { displayName } = req.user;
  const names = displayName.split(' ');
  const newUser = await models.User.create({ firstName: names[0],
    lastName: names[1],
    username: names[0] || names[1],
    image: req.user.photos[0].value,
    provider: req.user.provider,
    socialId: req.user.id });
  await displayOutput(newUser, res, displayName);
}, };

export default userInfo;
