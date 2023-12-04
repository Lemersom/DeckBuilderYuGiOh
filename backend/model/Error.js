const { DataTypes } = require('sequelize')
const sequelize = require('../helper/database')

const ErrorModel = sequelize.define('Error', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
        },
        message: {
            type: DataTypes.STRING
        }
    }
)

module.exports = ErrorModel