const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;  // get the token from the cookie
  if (token) {  // if there is a token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {  // verify the token
      if (err) { // if there is an error
        res.locals.user = null; // set the user to null
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else { // if there is no error
        let user = await UserModel.findById(decodedToken.id); // find the user in the database
        res.locals.user = user;  // set the user to the user in the database
        next(); // continue to the next middleware
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No7token');
  }
};
