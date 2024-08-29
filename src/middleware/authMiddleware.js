// Middleware pour vérifier si l'utilisateur est connecté
const authMiddleware = (req, res, next) => {
    // Vérifie si une session existe et si elle contient un userId
    if (req.session && req.session.userId) {
        // Si l'utilisateur est connecté, passer au middleware suivant
        next();
    } else {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        res.redirect('/login');
    }
};

module.exports = authMiddleware;