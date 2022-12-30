exports.emailValidation = (email) => {
  //// lesson: match String to RegEx!
  //// RegEx syntax is "/^()()()$/"
  //// Use {start, end} to denote set length
  //// Use \ to escape
  //// Use ? to denote previous set as optional

  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d\-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);

  //// returns individual pieces if match, returns null is doesn't match
};

exports.emailExists = (email, User) => {
  return User.findOne({ email: email });
};

exports.lengthValidation = (text, min, max) => {
  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
};

exports.usernameExists = (username, User) => {
  return User.findOne({ username: username });
};
