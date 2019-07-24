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
const commentValidation = (req, res, next) => {
  validations.ValidationSchema.comment(req.body);
  return validations.errors.length ? res.status(400).json({ errors: validations.errors }) : next();
};
const reportValidation = (req, res, next) => {
  validations.ValidationSchema.reportArticle(req.body);
  return validations.errors.length ? res.status(400).json({ errors: validations.errors }) : next();
};
export {
  bodyValidation,
  bodyValidationArticle,
  signinValidation,
  commentValidation,
  reportValidation
};
