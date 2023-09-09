const nodemailer = require('nodemailer');

require('dotenv').config();

async function sendResetPasswordEmail(username ,userEmail, resetToken) {
  try {
    // Tạo transporter để gửi email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Tạo nội dung email
    const mailOptions = {
      from: process.env.GMAIL,
      to: userEmail,
      subject: 'Reset Password',
      html: `
        <p>Dear ${username},</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="http://your-website.com/reset-password/${resetToken}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    };

    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', result);

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}

module.exports = {
    sendResetPasswordEmail
}
