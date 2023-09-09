
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Department = require('./Department');

const DepartmentUser = sequelize.define('DepartmentUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  }, {
    sequelize,
    tableName: 'department_users',
    timestamps: false,
  });

  DepartmentUser.beforeUpdate((departmentUser, options) => {
    departmentUser.updated_at = new Date();
  });

  

module.exports = DepartmentUser;
