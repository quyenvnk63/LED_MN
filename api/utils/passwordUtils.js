// utils/passwordUtils.js
const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
