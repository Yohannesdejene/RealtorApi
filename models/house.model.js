const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const House = sequelize.define('house',
    {
        id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        price: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
        },
        furnishingStatus: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        houseType: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        coverImage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        areaSize: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
        },
        city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        subcity: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        addressName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        mapLocation: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        bedrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        floorNumber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        agentName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        agentNumber: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        secondAgentNumber: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        marketStatus: {
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

module.exports = House;