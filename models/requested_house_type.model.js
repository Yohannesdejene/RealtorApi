const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const RequestedHouse = sequelize.define('requestedHouse',
    {
        id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        furnishingStatus: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        houseType: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        minAreaSize: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
        },
        maxAreaSize: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
        },
        city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        subcity: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        addressName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        bedrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        bathrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        floorNumber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        marketStatus: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        requestingUserName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        requestingPhoneNumber: {
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

module.exports = RequestedHouse;