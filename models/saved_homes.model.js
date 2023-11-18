const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const SavedHouse = sequelize.define('savedHouse',
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = SavedHouse;