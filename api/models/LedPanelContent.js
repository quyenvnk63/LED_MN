
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LedPanelContent = sequelize.define('LedPanelContent', {
    led_panel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    display_content_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      
    },
    is_displayed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'led_panel_content',
    timestamps: false,
  });

module.exports = LedPanelContent;
