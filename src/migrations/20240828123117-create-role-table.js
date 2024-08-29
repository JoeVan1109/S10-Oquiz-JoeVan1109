'use strict';

module.exports = {
  // Méthode 'up' pour appliquer la migration
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role', {
      // Colonne ID : clé primaire auto-incrémentée
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Colonne name : nom du rôle (unique)
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      // Colonne created_at : date de création
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // Colonne updated_at : date de dernière mise à jour
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  // Méthode 'down' pour annuler la migration
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role');
  }
};