const User = require("../models/User");
const {
  emailValidation,
  emailExists,
  lengthValidation,
  usernameExists,
} = require("../helpers/checks");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");

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
    console.log(url);
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
    console.log("reached here");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//activate function
exports.activate = async (req, res) => {
  const token = req.body.token; // this is token from url
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const validUser = req.user.id; // this is currently logged in user
  // if currently logged in user is trying to authorize some random token, that is not allowed!
  if (validUser !== user.id) {
    return res
      .status(400)
      .json({ message: "You're not authorized to validate this user" });
  }
  // use token of user to find its user information in database
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

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account has already been verified.",
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);
    return res.status(200).json({
      message: "Email verification link has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const find = await User.findOne({ email: email });
    if (!find) {
      return res.status(400).json({
        message: "Email address does not exist",
      });
    }
    return res.status(200).json({
      email: find.email,
      picture: find.picture,
      firstName: find.firstName,
      lastName: find.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    await Code.findOneAndRemove({ user: user._id }); // delete previous code if any

    const code = generateCode(5);
    console.log(code);
    const savedCode = await new Code({
      code: code,
      user: user._id,
    }).save();
    console.log("reached here 2");
    sendResetCode(user.email, user.firstName, code);
    console.log("reached point 3");
    return res
      .status(200)
      .json({ message: "Password reset code has been sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email }); // find user
    const Dcode = await Code.findOne({ user: user._id }); // find the code of that user
    console.log(Dcode.code);
    if (Dcode.code !== code) {
      // if code doesn't match
      return res.status(400).json({ message: "Invalid code" });
    }
    await Code.findOneAndUpdate({ user: user._id }, { verified: true }); //user has validated user
    return res.status(200).json({
      message: "Code is verified",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.findOne({ email: email });
    const codeSent = await Code.findOne({ user: user._id });
    if (!codeSent || !codeSent.verified) {
      return res
        .status(400)
        .json({ message: "You are not verified to change the password" });
    }
    await User.updateOne({ email: email }, { password: cryptedPassword });
    await Code.findOneAndRemove({ user: user._id });
    return res.status(200).json({ message: "Successfully reset password!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
