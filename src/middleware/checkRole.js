const { User, Role } = require('../models');

// Middleware pour vérifier si l'utilisateur a un rôle autorisé
const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Récupérer l'ID de l'utilisateur depuis la session
            const userId = req.session.userId;
            if (!userId) {
                // Si pas d'ID utilisateur, rediriger vers la page de connexion
                return res.status(401).redirect('/login');
            }

            // Récupérer l'utilisateur et ses rôles depuis la base de données
            const user = await User.findByPk(userId, {
                include: [{ model: Role, as: 'roles' }]
            });

            if (!user) {
                // Si l'utilisateur n'existe pas, rediriger vers la page de connexion
                return res.status(401).redirect('/login');
            }

            // Extraire les noms des rôles de l'utilisateur
            const userRoles = user.roles.map(role => role.name);
            // Vérifier si l'utilisateur a au moins un des rôles autorisés
            const hasAllowedRole = allowedRoles.some(role => userRoles.includes(role));

            if (hasAllowedRole) {
                // Si l'utilisateur a un rôle autorisé, passer au middleware suivant
                next();
            } else {
                // Sinon, afficher une erreur d'accès non autorisé
                res.status(403).render('error500', { message: 'Accès non autorisé' });
            }
        } catch (error) {
            console.error('Error checking role:', error);
            res.status(500).render('error500', { message: 'Une erreur est survenue' });
        }
    };
};

module.exports = checkRole;