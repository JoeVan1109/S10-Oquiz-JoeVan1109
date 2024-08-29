
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fonction pour trouver ou créer un rôle
    const findOrCreateRole = async (name) => {
      const [role] = await queryInterface.sequelize.query(
        `SELECT * FROM "role" WHERE name = ?`,
        { replacements: [name], type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      if (role) return role;
      
      const [newRole] = await queryInterface.bulkInsert('role', [
        { name, created_at: new Date(), updated_at: new Date() }
      ], { returning: true });
      return newRole;
    };

    // Fonction pour trouver ou créer une permission
    const findOrCreatePermission = async (name) => {
      const [permission] = await queryInterface.sequelize.query(
        `SELECT * FROM permission WHERE name = ?`,
        { replacements: [name], type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      if (permission) return permission;
      
      const [newPermission] = await queryInterface.bulkInsert('permission', [
        { name, created_at: new Date(), updated_at: new Date() }
      ], { returning: true });
      return newPermission;
    };

    // Trouver ou créer les rôles
    const etudiantRole = await findOrCreateRole('etudiant');
    const professeurRole = await findOrCreateRole('professeur');
    const visiteurRole = await findOrCreateRole('visiteur');

    // Trouver ou créer les permissions
    const createQuizPermission = await findOrCreatePermission('create_quiz');
    const readQuizPermission = await findOrCreatePermission('read_quiz');
    const viewProfilePermission = await findOrCreatePermission('view_profile');

    // Fonction pour associer un rôle à une permission s'ils ne sont pas déjà associés
    const associateRolePermission = async (roleId, permissionId) => {
      const [existing] = await queryInterface.sequelize.query(
        `SELECT * FROM role_permission WHERE role_id = ? AND permission_id = ?`,
        { replacements: [roleId, permissionId], type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      if (!existing) {
        await queryInterface.bulkInsert('role_permission', [{
          role_id: roleId,
          permission_id: permissionId,
          created_at: new Date(),
          updated_at: new Date()
        }]);
      }
    };

    // Associer les rôles aux permissions
    await associateRolePermission(professeurRole.id, createQuizPermission.id);
    await associateRolePermission(professeurRole.id, readQuizPermission.id);
    await associateRolePermission(professeurRole.id, viewProfilePermission.id);
    await associateRolePermission(etudiantRole.id, readQuizPermission.id);
    await associateRolePermission(etudiantRole.id, viewProfilePermission.id);
    await associateRolePermission(visiteurRole.id, viewProfilePermission.id);
  },

  down: async (queryInterface, Sequelize) => {
    // Optionnel : supprimer toutes les associations et entrées
    // Attention : cela supprimera toutes les données existantes
    await queryInterface.bulkDelete('role_permission', null, {});
    await queryInterface.bulkDelete('permission', null, {});
    await queryInterface.bulkDelete('role', null, {});
  }
};