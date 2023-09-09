const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {uuidToInt} = require('../utils/uuidInt');
const {User, ResetPassword} = require('../models/relations');

// Microservice cho Reset Forgot Password
async function createResetPasswordToken(userId) {
  try {
    const token = await crypto.randomBytes(20).toString('hex');
    const id = uuidToInt();
    console.log(id);
    
    const [resetPassword, created] = await ResetPassword.findOrCreate({
      where: { user_id: userId },
      defaults: {
        id: id,
        token: token,
        created_at: new Date(),
      }
    });

    if (!created) {
      // Bản ghi ResetPassword đã tồn tại, thực hiện cập nhật
      resetPassword.token = token;
      await resetPassword.save();
    }

    console.log(resetPassword.token);
    return resetPassword.token;
  } catch (error) {
    throw new Error('Failed to create or update reset password token');
  }
}

// Microservice cho Reset Password
async function verifyResetPasswordToken(token) {
  try {
    const resetPassword = await ResetPassword.findOne({
      where: {
        token: token,
      },
    });

    if (!resetPassword) {
      throw new Error('Invalid reset password token');
    }

    return resetPassword;
  } catch (error) {
    throw new Error('Failed to verify reset password token');
  }
}

// Microservice cho Reset Password
async function updateUserPassword(userId, newPassword) {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return user;
  } catch (error) {
    throw new Error('Failed to update user password');
  }
}


// async function generateResetPasswordToken() {
//     try {
//       const token = await crypto.randomBytes(20).toString('hex');
//       return token;
//     } catch (error) {
//       console.error('Failed to generate reset password token:', error);
//       throw new Error('Failed to generate reset password token');
//     }
//   }

module.exports = {
  createResetPasswordToken,
  verifyResetPasswordToken,
  updateUserPassword,
};
