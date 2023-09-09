
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LedPanelContentHistory = sequelize.define('LedPanelContentHistory', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    led_panel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    display_content_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'led_panel_content_history',
    timestamps: false,
  });

module.exports = LedPanelContentHistory;
