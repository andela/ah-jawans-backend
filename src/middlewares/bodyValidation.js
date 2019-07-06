/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import validations from '../helpers/validation';


const bodyValidation = async (req, res, next) => {
  validations.ValidationSchema.signup(req.body);
  return validations.errors.length
    ? res.status(400).json({ errors: validations.errors })
    : next();
};

const bodyValidationArticle = async (req, res, next) => {
  validations.ValidationSchema.articleDataValidation(req.body);
  return validations.errors.length ? res.status(400).json({ errors: validations.errors }) : next();
};
const signinValidation = (req, res, next) => {
  validations.ValidationSchema.login(req.body);
  return validations.errors.length ? res.status(400).json({ errors: validations.errors }) : next();
};


export {
  bodyValidation,
  bodyValidationArticle,
  signinValidation
};
