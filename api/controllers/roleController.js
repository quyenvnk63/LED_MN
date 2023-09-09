const RoleService = require('../services/roleService');
const { checkValidationResult } = require('../utils/validationResult');

async function getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async function getRoleById(req, res) {
    const { id } = req.params;
    try {
      const role = await RoleService.getRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function createRole(req, res) {
    await checkValidationResult(req);
    const roleData = req.body;
    try {
      const role = await RoleService.createRole(roleData);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function updateRole(req, res) {
    await checkValidationResult(req);
    const { id } = req.params;
    const roleData = req.body;
    try {
      const role = await RoleService.updateRole(id, roleData);
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function deleteRole(req, res) {
    await checkValidationResult(req);
    const { id } = req.params;
    try {
      await RoleService.deleteRole(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole, 
};


