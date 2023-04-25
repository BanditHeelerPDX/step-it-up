const authorized = (req, res, next) => {
  !req.session.loggedIn ? res.redirect("/login") : next();
};

module.exports = authorized;
