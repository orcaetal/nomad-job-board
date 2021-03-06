const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
  // make sure that the user is not on the system.
  const { body } = req;
  let exsitingUser;
  try {
    exsitingUser = await User.findOne({ email: body.email });
    if (exsitingUser) {
      res.status(400).json({
        errors: { email: { message: "user already exists with that email" } },
      });
      return;
    }
    if (body.passWord !== body.confirmPassword) {
      res.status(400).json({
        errors: { confirmPassword: { message: "passwords must match" } },
      });
      return;
    }
    const hash = await bcrypt.hash(body.passWord, 10);
    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      passWord: hash,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.login = async (req, res) => {
  const { body } = req;
  if (!body.email) {
    res.status(400).json({ error: "no email provided" });
    return;
  }
  try {
    const findUser = await User.findOne({ email: body.email }).populate(
      "savedJobs"
    );
    if (findUser == null) {
      res.status(400).json({ error: "cannot find  user with that email" });
      return;
    }

    const isMatch = await bcrypt.compare(body.passWord, findUser.passWord);
    if (!isMatch) {
      res.status(400).json({ error: "incorrect email and password" });
      return;
    }

    const userToken = await jwt.sign(
      { id: findUser._id },
      process.env.SECRET_KEY
    );

    req.session.userId = findUser._id;

    res
      .cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000),
      })
      .json(findUser);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("usertoken");
  req.session.destroy();
  res.json({ msg: "logout successful" });
};

module.exports.getCurrentUser = async (req, res) => {
  const { userId } = req.session;
  if (userId == null) {
    res.json({ user: null });
  } else {
    const user = await User.findOne({ _id: userId }).populate("savedJobs");
    res.json({ user });
  }
};
