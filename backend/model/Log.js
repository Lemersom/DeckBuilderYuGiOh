const { DataTypes } = require('sequelize')
const sequelize = require('../helper/database')

const CardModel = sequelize.define('Log', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        search: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false }
)

module.exports = CardModel