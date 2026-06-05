const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pass_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scanned_by: {
    type: DataTypes.INTEGER,
    allowNull: false // Admin ID who processed the entry
  },
  scanned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'checked_in'
  }
}, {
  tableName: 'attendance',
  timestamps: true
});

module.exports = Attendance;
