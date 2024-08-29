'use strict';

module.exports = {
  // Méthode 'up' pour appliquer la migration
  up: async (queryInterface, Sequelize) => {
    // Création de la table 'user_roles'
    await queryInterface.createTable('user_roles', {
      // Colonne user_id : clé étrangère vers la table 'user'
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Ajout d'une contrainte de clé primaire composée
    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id', 'role_id'],
      type: 'primary key',
      name: 'user_role_pkey'
    });
  },

  // Méthode 'down' pour annuler la migration
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
  }
}