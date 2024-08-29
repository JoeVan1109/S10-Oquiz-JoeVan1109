// Charger les variables d'environnement
require('dotenv').config();

module.exports = {
  // Configuration pour l'environnement de développement
  development: {
    use_env_variable: 'PG_URL', // Utilise la variable d'environnement PG_URL pour la connexion
    dialect: 'postgres', // Spécifie que nous utilisons PostgreSQL
    define: {
      createdAt: 'created_at', // Mappe le champ 'createdAt' à 'created_at' dans la base de données
      updatedAt: 'updated_at'  // Mappe le champ 'updatedAt' à 'updated_at' dans la base de données
    }
  },

  // Configuration pour l'environnement de test (identique à development)
  test: {
    use_env_variable: 'PG_URL',
    dialect: 'postgres',
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },

  // Configuration pour l'environnement de production (identique aux autres)
  production: {
    use_env_variable: 'PG_URL',
    dialect: 'postgres',
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}