const Role = require('../models/Role');
const {UserRole} = require('../models/relations');

async function assignRoleToUser(userId, roleId) {
  try {
    // Xóa tất cả các vai trò hiện tại của người dùng
    await UserRole.destroy({
      where: {
        user_id: userId,
      }
    });

    // Tạo mới vai trò duy nhất cho người dùng
    const [userRole, created] = await UserRole.findOrCreate({
      where: {
        user_id: userId,
        role_id: roleId,
      },
      defaults: {
        user_id: userId,
        role_id: roleId,
      }
    });

    if (!created) {
      throw new Error('User already has a role');
    }

    return userRole;
  } catch (error) {
    throw error;
  }
  
  }

  async function removeRoleFromUser(userId, roleId) {
    const deletedCount = await UserRole.destroy({
      where: {
        user_id: userId,
        role_id: roleId,
      },
    });
  
    if (deletedCount === 0) {
      throw new Error('User does not have the specified role.');
    }
  }
  
  

async function getAllRoles() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      throw new Error('Failed to fetch roles from the database.');
    }
}


async function createRole(roleData) {
    try {
      const role = await Role.create(roleData);
      return role;
    } catch (error) {
      throw new Error('Failed to create role.');
    }
  }

async function updateRole(id, roleData) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found.');
      }
      await role.update(roleData);
      return role;
    } catch (error) {
      throw new Error('Failed to update role.');
    }
  }


  async function deleteRole(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found.');
      }
      await role.destroy();
    } catch (error) {
      throw new Error('Failed to delete role.');
    }
  }

module.exports = {
    getAllRoles,
    createRole,
    updateRole,
    deleteRole, 
    assignRoleToUser,
    removeRoleFromUser,
}