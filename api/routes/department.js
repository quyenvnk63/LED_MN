const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/checkPermission');
const departmentController = require('../controllers/departmentController');
const authenticateToken = require('../middlewares/authenticateToken');
// create a new department
router.post('/',authenticateToken,checkPermission('create_department') ,departmentController.createDepartment);

// Lấy thông tin phòng ban bằng departmentId
router.get('/:departmentId', authenticateToken,departmentController.getDepartmentById);

// Lấy danh sách tất cả phòng ban
router.get('/',authenticateToken, checkPermission('get_all_department'),departmentController.getAllDepartments);

// Cập nhật thông tin phòng ban
router.put('/:departmentId',authenticateToken, checkPermission('update_department'),departmentController.updateDepartment);

// Xóa phòng ban
router.delete('/:departmentId',authenticateToken,checkPermission('delete_department'), departmentController.deleteDepartment);

router.post('/:id/users',authenticateToken,checkPermission('add_user_department'),departmentController.assignDepartmentToUser);

router.get('/:departmentId/ledpanels',authenticateToken,departmentController.getLedPanelsByDepartment);

module.exports = router;