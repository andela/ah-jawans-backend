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
      signupErrors.email = 'Email is required and should look like: example@example.com';
    }

    if (!data.password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(data.password.trim()))) {
      signupErrors.password = 'Your password should contain 8 characters , have at least one upper and lower case letter, and symbol';
    }

    if (!data.username || !(/^[A-Za-z_-]+$/.test(data.username))) {
      signupErrors.username = 'username is required, should contains at least 3 letters.';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.firstName))) {
      signupErrors.firstName = 'first name is required and should contains at least 3 letters.';
    }

    if (!(/^[A-Za-z_-]+$/.test(data.lastName))) {
      signupErrors.lastName = 'last name is required and should contains at least 3 letters.';
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

  static comment(data) {
    const commentErrors = {};
    if (!data.body || !(/([^]+)(?=.{1,})/.test(data.body.trim()))) {
      commentErrors.body = 'Body is required and should contain at least 1 character';
    }
    errors.length = 0;
    addErrors(commentErrors);
  }

  static highlight(data) {
    const highlightErrors = {};
    if (!data.comment || !(/([^]+)(?=.{1,})/.test(data.comment.trim()))) {
      highlightErrors.comment = 'Comment is required and should contain at least 1 character';
    }

    if (!data.indexStart || !data.indexEnd || typeof data.indexStart !== 'number' || typeof data.indexEnd !== 'number' || data.indexStart < 0 || data.indexEnd < 0) {
      highlightErrors.indexStart = 'Start and End index is required and should be a positive number';
    }

    errors.length = 0;
    addErrors(highlightErrors);
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
