const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

// const sequelize = new Sequelize('mystore', 'oleg', '123456', {
//     host: 'localhost',
//     dialect: 'postgres'
// })

module.exports = sequelize