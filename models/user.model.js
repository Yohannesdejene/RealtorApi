const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('user',
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
        gender: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        dateOfBirth: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: null,
        },
        notificationToken: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);

module.exports = User;