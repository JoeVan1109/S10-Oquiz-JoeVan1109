const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Permission extends Model {}

    Permission.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    }, {
    sequelize,
    tableName: "permission"
    });

module.exports = Permission;