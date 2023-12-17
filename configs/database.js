const Sequelize = require("sequelize").Sequelize;

// const sequelize = new Sequelize("circlefr_realtor", "root", "",
//     { host: "localhost", dialect: "mysql" }
// );

const sequelize = new Sequelize("circlefr_realtor", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
