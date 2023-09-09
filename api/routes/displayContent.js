const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/checkPermission');
const displayContentController = require('../controllers/displayContentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/presigned-url',authenticateToken, displayContentController.getPresignedUrl);
router.get('/geturlContent/:key',authenticateToken,displayContentController.getUrlContent);


//display
router.get('/',authenticateToken, checkPermission('get_all_content') ,displayContentController.getAllDisplayContents);
router.get('/:id',authenticateToken, displayContentController.getDisplayContentById);
router.post('/:ledpanelId',authenticateToken,displayContentController.createDisplayContent);
router.put('/:id',authenticateToken, checkPermission('update_content'),displayContentController.updateDisplayContent);
router.delete('/:id',authenticateToken, checkPermission('delete_content'),displayContentController.deleteDisplayContent);
router.post('/:displayContentId/led-panel',authenticateToken,checkPermission('set_content_on'),displayContentController.setDisplayedContentForLedPanel);
router.get('/led-panels/:ledPanelId',displayContentController.getContentbyLedPanel);

module.exports = router;
// ,authenticateToken
// , checkPermission('create_content')