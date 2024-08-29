const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Role extends Model {
    static associate(models) {
        Role.belongsToMany(models.User, { 
        through: 'user_roles',
        as: 'users',
        foreignKey: 'role_id'
        });
    }
    }

    Role.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    }, {
        sequelize,
        tableName: "role"
    });

module.exports = Role;