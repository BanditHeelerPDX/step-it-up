const authorized = require('../utils/auth');

const linkBack = document.querySelector('#link-back');
if (authorized) {
    linkBack.href = '/dashboard';
} else {
    linkBack.href = '/';
}