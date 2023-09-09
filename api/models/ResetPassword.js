
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResetPassword = sequelize.define('ResetPassword', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'reset_password',
    timestamps: false,
  });

module.exports = ResetPassword;
