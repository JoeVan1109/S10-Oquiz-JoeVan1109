'use strict';

module.exports = {
  // Méthode 'up' pour appliquer la migration
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permission', {
      // Colonne ID : clé primaire auto-incrémentée
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Colonne role_id : clé étrangère vers la table 'role'
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Colonne permission_id : clé étrangère vers la table 'permission'
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permission',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('role_permission');
  }
};