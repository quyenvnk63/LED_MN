const mysql2 = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cấu hình kết nối cơ sở dữ liệu

console.log(process.env.REDIS_HOST)
const options = {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306
};

if (options.dialect === 'mysql') {
  options.dialectModule = mysql2;
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, options);

// Kiểm tra kết nối cơ sở dữ liệu
sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công');
  })
  .catch((error) => {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
  });

module.exports = sequelize;
