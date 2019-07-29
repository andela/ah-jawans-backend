/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import validations from '../helpers/validation';

const returnBody = async (res, next) => {
  return (validations.errors.length)
    ? res.status(400).json({ status: 400, message: validations.errors })
    : next();
};

const bodyValidation = async (req, res, next) => {
  validations.ValidationSchema.signup(req.body);
  await returnBody(res, next);
};

const bodyValidationArticle = async (req, res, next) => {
  validations.ValidationSchema.articleDataValidation(req.body);
  await returnBody(res, next);
};
const signinValidation = async (req, res, next) => {
  validations.ValidationSchema.login(req.body);
  await returnBody(res, next);
};
const commentValidation = async (req, res, next) => {
  validations.ValidationSchema.comment(req.body);
  await returnBody(res, next);
};
const reportValidation = async (req, res, next) => {
  validations.ValidationSchema.reportArticle(req.body);
  await returnBody(res, next);
};
export {
  bodyValidation,
  bodyValidationArticle,
  signinValidation,
  commentValidation,
  reportValidation
};
