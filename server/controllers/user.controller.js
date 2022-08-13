const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");
const gravatar = require("gravatar");
require("dotenv").config();

//@route : GET "/api/users/"
//@desc  : get current logged in user
//@access: Private
const GetLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.json({ msg: "User does not exists" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

//@route : POST "/api/users/login"
//@desc  : logged in user
//@access: Public
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcyrpt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    //sign jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 432000 },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        return res.json({
          token,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//@route : POST "/api/users/"
//@desc  : To create new user in the database
//@access: Public

const Register = async (req, res) => {
  try {
    //check if there exists in the database
    const { name, email } = req.body;
    console.log(name, email);
    let user = await User.findOne({ email });
    console.log(name, email, user);
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    let { password } = req.body;
    let { avatar } = req.body;
    avatar = gravatar.url(email, { s: "200", r: "pg", d: "404" });
    //hash the password
    const salt = await bcyrpt.genSalt(10);
    password = await bcyrpt.hash(password, salt);
    user = new User({
      name,
      email,
      password,
      avatar,
    });

    console.log(user);

    //sign jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 432000 },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        return res.json({
          token,
        });
      }
    );

    //save the user to database
    await user.save(); //

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { GetLoggedInUser, Login, Register };
