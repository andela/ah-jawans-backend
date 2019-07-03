/* eslint-disable no-empty */
/* eslint-disable require-jsdoc */
const errors = [];
const addErros = (obj) => {
  if (Object.keys(obj).length > 0) {
    errors.push(obj);
  }
};

class ValidationSchema {
  static signup(data) {
    const signupErros = {};
    if (!data.email || !(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)\.([a-zA-Z]{2,5})$/.test(data.email))) {
      signupErros.email = 'Email is required and should look like: example@example.com!';
    }

    if (!data.password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(data.password.trim()))) {
      signupErros.password = 'Password is required and should look like: Example1@';
    }

    if (!data.username || !(/^[A-Za-z_-]+$/.test(data.username))) {
      signupErros.username = 'username is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.firstName))) {
      signupErros.firstName = 'first name is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.lastName))) {
      signupErros.lastName = 'last name is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }
    errors.length = 0;
    addErros(signupErros);
  }
}

export default { ValidationSchema, errors };
