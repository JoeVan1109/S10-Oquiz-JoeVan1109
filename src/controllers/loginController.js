const { User } = require("../models/index");
const bcrypt = require('bcrypt');

const loginController = {
    // Afficher la page de connexion
    renderLoginPage: (req, res) => {
        res.render('login');
    },

    // Traiter la tentative de connexion
    loginPage: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Rechercher l'utilisateur par email
            const loginUser = await User.findOne({ where: { email } });
    
            // Vérifier si l'utilisateur existe et si le mot de passe est correct
            if (!loginUser || !(await bcrypt.compare(password, loginUser.password))) {
                return res.status(400).render('login', { error: 'Email ou mot de passe incorrect' });
            }
    
            // Définir la session utilisateur
            req.session.userId = loginUser.id;
            req.session.userEmail = loginUser.email;
    
            console.log('Session après connexion:', req.session);
    
            // Forcer la sauvegarde de la session
            req.session.save((err) => {
                if (err) {
                    console.error('Erreur lors de la sauvegarde de la session:', err);
                    return res.status(500).render('error500', { error: err });
                }
            });

            // Rediriger vers la page de profil
            res.redirect(`/profil/${loginUser.id}`);
        } catch (error) {
            console.error('Erreur de connexion:', error);
            res.status(500).render('error500');
        }
    },

    // Afficher la page de profil
    renderProfilPage: async (req, res) => {
        try {
            const userId = Number(req.params.id);
        
            // Rechercher l'utilisateur par ID
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).render('error404');
                console.log("L'utilisateur n'existe pas");
            }
        
            res.render('profil', { user });
        } catch (error) {
            res.status(500).render('error500');
        }
    },

    // Déconnexion
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la déconnexion:', err);
            }
            res.redirect('/login');
        });
    }
};

module.exports = loginController;