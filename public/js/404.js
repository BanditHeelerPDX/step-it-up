const authorized = require('../utils/auth');

const linkBack = document.querySelector('#link-back');
authorized(req, res, () => {
    linkBack.href = '/dashboard';
  }, () => {
    linkBack.href = '/';
  });