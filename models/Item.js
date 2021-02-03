const Sequelize = require('sequelize')
const sequelize = require('../db')

const Item = sequelize.define('item', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userid:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    city:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Item