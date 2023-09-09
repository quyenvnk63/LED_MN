const { Role, RoleDetail } = require('../models/relations');

// Middleware to check permissions
function checkPermission(actionCode) {
  return async function(req, res, next) {
    const roleId = req.user.roleId;

    try {
      // Find the role based on the roleId
      const role = await Role.findByPk(roleId);

      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }

      // Check if the role has the specified actionCode permission
      const permission = await RoleDetail.findOne({
        where: {
          role_id: role.id,
          action_code: actionCode,
          check: true,
        },
      });

      if (!permission) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      // Permission granted, continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle errors
      console.error('Permission check failed:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = {
  checkPermission,
};
