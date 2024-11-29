const mysql = require('mysql');

// Create database connection
const db = mysql.createConnection({
  host: 'nnmeqdrilkem9ked.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'de1znxqd8t73eu8c',
  password: 'tmbtxijqi18nxnwf', 
  database: 'v1pydn5nn39ee97o',
  port: '3306'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

module.exports = db;
