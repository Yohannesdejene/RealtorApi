const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("circlefr_realtor", "root", "",
    { host: "localhost", dialect: "mysql" }
);



module.exports = sequelize;
