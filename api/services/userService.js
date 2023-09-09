// services/userService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const { Role,User,UserRole } = require('../models/relations');


require('dotenv').config();

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] }, 
        attributes: ['id', 'name'],
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function validatePassword(password,hash) {
  return await bcrypt.compare(password, hash);
}
async function generateToken(userId) {
  token = await jwt.sign({ userId },'8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=' , { expiresIn: '1h' });
  return token;
}
// CREAETE 
async function createUser(userData) {
  try {
    console.log(userData);
    // const user = await User.create(userData);
    const user = await User.create(userData);
    user.password = null;
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

// READ
async function getUserById(userId) {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    return user;
  } catch (error) {
    throw new Error('Failed to get user');
  }
}

async function getAllUsers() {
  try {
    const usersWithRoles = await User.findAll({
      attributes: ['id', 'name', 'email', 'status'], // Specify the attributes for the User model
      include: [
        {
          model: Role,
          attributes: ['id', 'name'], // Specify the attributes for the Role model
          through: { attributes: [] }, // Exclude the UserRole attributes from the result
        },
      ],
    });

    return usersWithRoles;
  } catch (error) {
    throw new Error('Failed to get all users with roles');
  }
}


// UPDATE
async function updateUser(userId, userData) {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (userData.password){
        const passwordHash = await bcrypt.hash(userData.password, 10);
        userData.password = passwordHash;
      }
      await user.update(userData);
      return user;
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

// DELETE
async function deleteUser(userId) {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return 'User deleted successfully';
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  generateToken,
  validatePassword,
};
