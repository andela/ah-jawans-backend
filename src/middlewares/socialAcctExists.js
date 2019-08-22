import models from '../models';
import tokenGeneration from '../helpers/tokenGenerator';

const userExists = { async google(req, res, next) {
  const { emails } = req.user;
  const currentUser = await models.User.findOne({ where: { email: emails[0].value, }, });
  if (currentUser) {
    const token = await tokenGeneration.generateToken(currentUser.dataValues);
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
  next();
},
async twitter(req, res, next) {
  const currentUser = await models.User.findOne({ where: { socialId: req.user.id }, });
  if (currentUser) {
    const token = await tokenGeneration.generateToken(currentUser.dataValues);
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
  next();
}, };
export default userExists;
