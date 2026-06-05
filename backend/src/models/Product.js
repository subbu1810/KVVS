const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kw_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  },
  benefits: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability_status: {
    type: DataTypes.STRING,
    defaultValue: 'available'
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
