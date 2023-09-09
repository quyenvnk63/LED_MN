const userService = require('../services/userService');
const departmentService = require('../services/departmentService');
const roleService = require('../services/roleService');
const { validateUserData } = require('../utils/validationResult');
const { hashPassword } = require('../utils/passwordUtils');

// CREATE
async function createUser(req, res,next) {
  
  try {
    // await validateUserData(req);
    //check user is existing
    const email = req.body.email;
    const check = await userService.getUserByEmail(email);
    if (check) {
      return res.status(401).json({ message: 'user is exist' });
    }

    
    const passwordHash = await hashPassword(req.body.password);
    const {department_id,role_id} = req.body;
    const userData = { ...req.body, password:passwordHash };
    const user = await userService.createUser(userData);
    await departmentService.assignDepartmentToUser(user.id, department_id);
    await roleService.assignRoleToUser(user.id, role_id);
    res.status(201).json({
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message});
    // next(error);
  }
}


async function assignRoleToUser(req,res) {
  try {
    const userId = req.params.id;
    const roleId = req.body.roleId;

    await roleService.assignRoleToUser(userId, roleId);

    res.status(200).json({message: 'Role assigned successfully'});
  }catch (error) {
    res.status(500).json({error:error.message});
  }
}


async function removeRoleFromUser(req, res) {
  try{
    const userId = req.params.id;
    const roleId = req.body.roleId;

    await roleService.removeRoleFromUser(userId, roleId);

    res.status(200).json({message: 'Role deleted successfully'});

  }catch(error){
    res.status(500).json({message:error.message});
  }
}

// get department by user_id
async function getDepartmentsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const departments = await departmentService.getDepartmentsByUserId(userId);

    res.json({ departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// READ
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE
async function updateUser(req, res) {


  try {
    await validateUserData(req.body);
    const userId = req.params.id;
    const userData = req.body;
    const user = await userService.updateUser(userId, userData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE
async function deleteUser(req, res) {

  try {
    await validateUserData(req.body);
    const userId = req.params.id;
    const message = await userService.deleteUser(userId);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  assignRoleToUser,
  removeRoleFromUser,
  getDepartmentsByUserId,
};
