module.exports = (req, res, next) => {
  if (!req.session.isAuth) {
    console.log(req);
    return res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }
  next();
};
