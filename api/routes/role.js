// routes/auth.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { checkPermission } = require('../middlewares/checkPermission');
const authenticateToken = require('../middlewares/authenticateToken');
// Định tuyến GET /roles để lấy tất cả các vai trò
router.get('/',authenticateToken, roleController.getAllRoles);

// Định tuyến GET /roles/:id để lấy thông tin của một vai trò cụ thể
router.get('/:id',authenticateToken, checkPermission('get_role_detail'),roleController.getRoleById);

// Định tuyến POST /roles để tạo mới một vai trò
router.post('/',authenticateToken,checkPermission('create_role'), roleController.createRole);

// Định tuyến PUT /roles/:id để cập nhật thông tin của một vai trò cụ thể
router.put('/:id',authenticateToken, checkPermission('update_role'),roleController.updateRole);

// Định tuyến DELETE /roles/:id để xóa một vai trò cụ thể
router.delete('/:id',authenticateToken, checkPermission('delete_role'),roleController.deleteRole);

module.exports = router;
