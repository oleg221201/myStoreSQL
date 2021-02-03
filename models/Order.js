const Sequelize = require('sequelize')
const sequelize = require('../db')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    itemid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    count: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    clientEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clientName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clientCity: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Order