const { User, Role } = require('../models');
const bcrypt = require('bcrypt');

const signupController = {
  // Afficher le formulaire d'inscription
  renderSignUpForm: (req, res) => {
    res.render('signup');
  },

  // Traiter l'inscription d'un nouvel utilisateur
  signUpPage: async (req, res) => {
    try {
      const { firstname, lastname, email, password, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).render('signup', { error: 'Cet email est déjà associée à un compte' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer le nouvel utilisateur
      const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });

      // Trouver le rôle correspondant
      const userRole = await Role.findOne({ where: { name: role } });
      if (!userRole) {
        throw new Error("Le rôle sélectionné n'existe pas");
      }

      // Attribuer le rôle à l'utilisateur
      await newUser.addRole(userRole);

      // Ajouter l'ID de l'utilisateur à la session
      req.session.userId = newUser.id;

      // Rediriger vers la page de profil
      res.redirect(`/profil/${newUser.id}`);

    } catch (error) {
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
  }
};

module.exports = signupController;