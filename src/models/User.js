const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class User extends Model {
  // Méthode pour définir les associations avec d'autres modèles
  static associate(models) {
    // Relation many-to-many avec le modèle Role
    User.belongsToMany(models.Role, { 
      through: 'UserRoles',  // Table de jonction
      as: 'roles',           // Alias pour accéder aux rôles
      foreignKey: 'user_id'  // Clé étrangère dans la table de jonction
    });
  }
}

// Initialisation du modèle User
User.init({
  // Définition des champs du modèle
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false  // L'email ne peut pas être null
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false  // Le mot de passe ne peut pas être null
  }
}, {
  sequelize,        // Instance de connexion Sequelize
  tableName: "user" // Nom de la table dans la base de données
});

module.exports = User;