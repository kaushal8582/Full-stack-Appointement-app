const Sequelize = require("sequelize")
const sequelize = require("../Utils/database.js")

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    username:Sequelize.STRING,
    phoneNo:Sequelize.BIGINT,
    email:Sequelize.STRING
})

module.exports = User;