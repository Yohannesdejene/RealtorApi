const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Admin = sequelize.define('admin',
    {
        id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);

module.exports = Admin;