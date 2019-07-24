/* eslint-disable no-empty */
/* eslint-disable require-jsdoc */
const errors = [];
const addErrors = (obj) => {
  if (Object.keys(obj).length > 0) {
    errors.push(obj);
  }
};

class ValidationSchema {
  static signup(data) {
    const signupErrors = {};
    if (!data.email || !(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)\.([a-zA-Z]{2,5})$/.test(data.email))) {
      signupErrors.email = 'Email is required and should look like: example@example.com!';
    }

    if (!data.password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(data.password.trim()))) {
      signupErrors.password = 'Your password should contain 8 characters , have a least one upper and lower case letter and symbol';
    }

    if (!data.username || !(/^[A-Za-z_-]+$/.test(data.username))) {
      signupErrors.username = 'username is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.firstName))) {
      signupErrors.firstName = 'first name is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.lastName))) {
      signupErrors.lastName = 'last name is required, should at list contains 3 letters and can have underscores(_) and hyphens (-)';
    }
    errors.length = 0;
    addErrors(signupErrors);
  }

  static articleDataValidation(data) {
    const articleErrors = {};
    if (!data.title || !(/([^]+)(?=.{10,})/.test(data.title.trim()))) {
      articleErrors.title = 'Title is required and should contain at least 10 characters';
    }

    if (!data.description || !(/([^]+)(?=.{10,})/.test(data.description.trim()))) {
      articleErrors.description = 'Description is required and should contain at least 10 characters';
    }

    if (!data.body || !(/([^]+)(?=.{10,})/.test(data.body.trim()))) {
      articleErrors.body = 'Body is required and should contain at least 10 character';
    }
    errors.length = 0;
    addErrors(articleErrors);
  }

  static login(data) {
    const loginErrors = {};
    if (!data.email || !(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)\.([a-zA-Z]{2,5})$/.test(data.email))) {
      loginErrors.email = 'Email is required and should look like: example@example.com!';
    }

    if (!data.password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(data.password.trim()))) {
      loginErrors.password = 'Password is required and should look like: Example1@';
    }
    errors.length = 0;
    addErrors(loginErrors);
  }

  static comment(data) {
    const commentErrors = {};
    if (!data.body || !(/([^]+)(?=.{1,})/.test(data.body.trim()))) {
      commentErrors.body = 'Body is required and should contain at least 1 character';
    }
    errors.length = 0;
    addErrors(commentErrors);
  }

  static reportArticle(data) {
    const reportErrors = {};
    if (!data.comment || !(/([^]+)(?=.{10,})/.test(data.comment.trim()))) {
      reportErrors.comment = 'Body is required and should contain at least 10 characters';
    }
    if (!data.reportType || !(/([^]+)(?=.{3,})/.test(data.reportType.trim()))) {
      reportErrors.reportType = 'Body is required and should contain at least 3 characters';
    }
    errors.length = 0;
    addErrors(reportErrors);
  }
}
export default { ValidationSchema, errors };
