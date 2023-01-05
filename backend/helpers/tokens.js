const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  //generate jwt token that expires in 7 days for THAT user
  //payload is that user's id
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
