const { DataTypes } = require('sequelize')
const sequelize = require('../helper/database')

const CardModel = sequelize.define('Card', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    }
)

module.exports = CardModel