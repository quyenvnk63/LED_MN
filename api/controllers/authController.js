  // controllers/authController.js
  const { validationResult } = require('express-validator');
  const userService = require('../services/userService');
  const { comparePasswords } = require('../utils/passwordUtils');
  const { loginValidator } = require('../utils/validation');

  exports.login = [
    loginValidator, // Sử dụng validate để kiểm tra dữ liệu đầu vào
    async (req, res) => {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
          return res.status(401).json({ message: 'user not exist ' });
        }

        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'passwords is wrong' });
        }

        // Thực hiện xác thực thành công, tạo và trả về token
        const token = await userService.generateToken(user.id);
        const userInfo = {
          id: user.id,
          email: user.email,
          name: user.name,
          role_id: user.Roles.length > 0 ? user.Roles[0].id : null,
          roles: user.Roles ? user.Roles.map((role) => role.name) : [],
        };
        res
        .cookie("access_token", token, {
           httpOnly: true,
        })
        .status(200)
        .json({ token, user: userInfo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  ];
