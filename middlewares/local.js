module.exports = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.fullName = req.session.fullName;
  next();
};
