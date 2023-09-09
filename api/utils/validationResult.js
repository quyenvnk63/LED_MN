const { validationResult } = require('express-validator');
const { isEmail, isString, isStrongPassword } = require('validator');

function validateLedPanelData() {
  return [
    (req, res, next) => {
      const errors = [];

      if (typeof req.body.name !== 'string') {
        errors.push('Name must be a string');
      }

      if (typeof req.body.address !== 'string') {
        errors.push('Address must be a string');
      }

      if (typeof req.body.department_id !== 'number') {
        errors.push('Department ID must be a number');
      }

      if (typeof req.body.device_code !== 'string') {
        errors.push('Device code must be a string');
      }

      // Các quy tắc kiểm tra hợp lệ bổ sung cho các thuộc tính khác

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
    },
  ];
}

function validateUserData() {
  return [
    (req, res, next) => {
      const errors = [];

      if (!isEmail(req.body.email)) {
        errors.push('Email must be a valid email address');
      }

      if (!isString(req.body.name)) {
        errors.push('Name must be a string');
      }

      if (!isStrongPassword(req.body.password)) {
        errors.push('Password must be a strong password');
      }

      // Additional validation rules for other properties

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
    },
  ];
}

module.exports = {
  validateLedPanelData,
  validateUserData,
};
