/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import validations from '../helpers/validation';


const bodyValidation = async (req, res, next) => {
  validations.ValidationSchema.signup(req.body);
  validations.errors.length === 0
    ? next()
    : res.status(400).json({ errors: validations.errors });
};

const bodyValidationArticle = async (req, res, next) => {
  validations.ValidationSchema.articleDataValidation(req.body);
  validations.errors.length === 0 ? next() : res.status(400).json({ errors: validations.errors });
};


export {
  bodyValidation,
  bodyValidationArticle
};
