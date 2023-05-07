const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('./errors');
const maxAge = 3 * 24 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  const { pseudo, password } = req.body

  try {
    const user = await UserModel.login(pseudo, password);
    const token = await createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  try {
    res.status(200).json({ message: "Disconnected" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}