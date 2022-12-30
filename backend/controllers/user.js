const User = require("../models/User");
const {
  emailValidation,
  emailExists,
  lengthValidation,
  usernameExists,
} = require("../helpers/checks");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // try saving new user, catch error and return error message

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    // generate username
    d = new Date();
    num = Math.floor(d.getTime() * Math.random()).toString();
    username = firstName + lastName + num.slice(num.length - 2, num.length);
    console.log(await User.findOne({ username: username }));
    while (await User.findOne({ username: username })) {
      num = Math.floor(d.getTime() * Math.random()).toString();
      username = firstName + lastName + num.slice(num.length - 2, num.length);
    }

    // validate email
    if (!emailValidation(email)) {
      return res.status(400).json({
        message: "invalid email",
      });
    }

    // check if email already exists
    if (await emailExists(email, User)) {
      return res.status(400).json({
        message: "Email already exists. Please try a different email",
      });
    }

    // check if lengths are okay
    if (!lengthValidation(firstName, 2, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 and 30 characters",
      });
    }
    if (!lengthValidation(lastName, 2, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 30 characters",
      });
    }
    if (!lengthValidation(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be between 6 and 40 characters",
      });
    }

    // check if username already exists
    if (await usernameExists(username, User)) {
      return res.status(400).json({
        message: "Username already exists, try a different username",
      });
    }

    // encrypt password
    const cryptedPassword = await bcrypt.hash(password, 12);

    // save new user
    const user = await new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: cryptedPassword,
      bYear: bYear,
      bMonth: bMonth,
      bDay: bDay,
      gender: gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    // send email verification to newly registered user
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      token: token,
      verified: user.verified,
      message:
        "Register Success! Activate your email to start using MoshuiBook!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//activate function
exports.activate = async (req, res) => {
  token = req.body.token;

  // use token of user to find its user information in database
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const check = await User.findById(user.id);

  // check if user is legit in the database
  if (check.verified == true) {
    return res.status(400).json({ message: "Account already activated" });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res.status(200).json({ message: "Account successfully activated" });
  }
};

// login function
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      // no user found
      return res
        .status(400)
        .json({ message: "This email is not connected to an account" });
    } else {
      // compare password with hash in database
      bcrypt.compare(password, user.password, (err, comparison) => {
        if (!err) {
          if (comparison) {
            // correct password
            const token = generateToken({ id: user._id.toString() }, "7d");
            res.send({
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              picture: user.picture,
              token: token,
              verified: user.verified,
            });
          } else {
            return res
              .status(400)
              .json({ message: "Wrong password. Please try again." });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
