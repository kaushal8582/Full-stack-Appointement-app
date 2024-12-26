const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('appointment','root','k.b123@45',{host:"localhost",dialect:"mysql"})

module.exports = sequelize;