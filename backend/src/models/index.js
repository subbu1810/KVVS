const sequelize = require('../config/database');
const User = require('./User');
const Admin = require('./Admin');
const Product = require('./Product');
const Event = require('./Event');
const Registration = require('./Registration');
const Payment = require('./Payment');
const Pass = require('./Pass');
const Attendance = require('./Attendance');

// 1. User <-> Registration
User.hasMany(Registration, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Registration.belongsTo(User, { foreignKey: 'user_id' });

// 2. Product <-> Registration
Product.hasMany(Registration, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Registration.belongsTo(Product, { foreignKey: 'product_id' });

// 3. Event <-> Registration
Event.hasMany(Registration, { foreignKey: 'event_id', onDelete: 'CASCADE' });
Registration.belongsTo(Event, { foreignKey: 'event_id' });

// 4. Registration <-> Payment
Registration.hasOne(Payment, { foreignKey: 'registration_id', onDelete: 'CASCADE' });
Payment.belongsTo(Registration, { foreignKey: 'registration_id' });

// 5. Registration <-> Pass
Registration.hasOne(Pass, { foreignKey: 'registration_id', onDelete: 'CASCADE' });
Pass.belongsTo(Registration, { foreignKey: 'registration_id' });

// 6. Pass <-> Attendance
Pass.hasMany(Attendance, { foreignKey: 'pass_id', onDelete: 'CASCADE' });
Attendance.belongsTo(Pass, { foreignKey: 'pass_id' });

// 7. Admin <-> Attendance (as auditor/gatekeeper)
Admin.hasMany(Attendance, { foreignKey: 'scanned_by', onDelete: 'CASCADE' });
Attendance.belongsTo(Admin, { foreignKey: 'scanned_by' });

module.exports = {
  sequelize,
  User,
  Admin,
  Product,
  Event,
  Registration,
  Payment,
  Pass,
  Attendance
};
