const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../services/userService');
const { sendResetPasswordEmail } = require('../services/emailService');

const resetPasswordService = require('../services/resetPasswordService');

// Controller cho  Forgot Password
async function resetForgotPasswordController(req, res) {
  const { email } = req.body;

  try {
    // Kiểm tra và lấy thông tin người dùng dựa trên email
    const user = await getUserByEmail(email);
    // console.log(user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Tạo mã reset password
    const resetPasswordToken = await resetPasswordService.createResetPasswordToken(user.id);

    // Gửi email chứa liên kết reset password
    await sendResetPasswordEmail(user.name ,user.email, resetPasswordToken);

    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller cho Reset Password
async function resetPasswordController(req, res) {
  const { token, newPassword } = req.body;

  try {
    // Xác thực mã reset password
    const resetPassword = await resetPasswordService.verifyResetPasswordToken(token);

    // Lấy thông tin người dùng từ mã reset password
    const userId = resetPassword.userId;

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới cho người dùng
    await resetPasswordService.updateUserPassword(userId, hashedPassword);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  resetForgotPasswordController,
  resetPasswordController,
};
