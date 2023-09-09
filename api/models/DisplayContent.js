
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LedPanelContent = require('./LedPanelContent'); 
const DisplayContent = sequelize.define('DisplayContent', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'display_contents',
    timestamps: false,
  });
  // Hook sau khi xóa DisplayContent
  DisplayContent.hasMany(LedPanelContent, {
    foreignKey: 'display_content_id',
    onDelete: 'CASCADE', // Ensure this line is present
  });

module.exports = DisplayContent;
