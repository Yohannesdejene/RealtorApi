const Sequelize = require("sequelize").Sequelize;

// const sequelize = new Sequelize("circlefr_realtor", "root", "",
//     { host: "localhost", dialect: "mysql" }
// );

const sequelize = new Sequelize(
  "circlefr_realtor",
  "circlefr_mogesdev",
  "realtor@123",
  { dialect: "mysql", host: "circlefreelance.com" }
);

module.exports = sequelize;
