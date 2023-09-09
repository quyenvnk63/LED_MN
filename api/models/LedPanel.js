
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LedPanel = sequelize.define('LedPanel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    active: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue:1,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    device_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    size: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'led_panels',
    timestamps: false,
  });

  
module.exports = LedPanel;
