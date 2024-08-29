// Charger les variables d'environnement
require("dotenv/config");

// Importer la classe Sequelize depuis le package sequelize
const { Sequelize } = require('sequelize');

// Créer une nouvelle instance de Sequelize pour se connecter à la base de données PostgreSQL
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres", // Spécifier que nous utilisons PostgreSQL

  // Configurer les options par défaut pour tous les modèles
  define: {
    createdAt: "created_at", // Mapper le champ 'createdAt' à 'created_at' dans la base de données
    updatedAt: "updated_at"  // Mapper le champ 'updatedAt' à 'updated_at' dans la base de données
  }
});

// Exporter l'instance Sequelize pour l'utiliser dans d'autres parties de l'application
module.exports = sequelize;