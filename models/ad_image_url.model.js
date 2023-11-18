const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const AdImageUrl = sequelize.define('adImageUrl',
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        imageUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,

        },
    },
    {
        timestamps: true,
    },
);

module.exports = AdImageUrl;