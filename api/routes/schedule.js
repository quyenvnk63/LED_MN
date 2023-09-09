const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/checkPermission');
const displayContentController = require('../controllers/scheduleController');
const authenticateToken = require('../middlewares/authenticateToken');


// Tạo lịch trình cho nội dung
router.post('/',displayContentController.scheduleDisplayContent);

// Xóa lịch trình dựa trên ID
router.delete('/:id',displayContentController.deleteScheduledContent);

// Lấy danh sách lịch trình dựa trên ledpanelId
router.get('/led-panel/:ledpanelId',displayContentController.getScheduledContentsByLedPanel);



module.exports = router;

// , checkPermission('get_schedule')
// ,authenticateToken, checkPermission('create_schedule')
// ,authenticateToken
// ,authenticateToken, checkPermission('delete_schedule')