require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.dbpassword,
    database: "dogwalk",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
