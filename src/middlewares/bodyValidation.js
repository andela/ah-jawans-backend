import validations from '../helpers/validation';

const bodyValidation = (req, res, next) => {
  const data = req.body;
  validations.ValidationSchema.signup(data);
  if (!validations.errors[0]) {
    next();
  } else {
    return res.status(400).json({ errors: validations.errors });
  }
};

export default bodyValidation;
