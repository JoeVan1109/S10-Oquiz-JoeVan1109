const { Quiz } = require("../models/index.js");

const mainController = {
  // Méthode pour afficher la page d'accueil
  renderHomePage: async (req, res) => {
    try {
      // Récupérer tous les quizzes de la base de données
      const quizz = await Quiz.findAll({
        include: [ "author", "tags" ], // Inclure les relations 'author' et 'tags'
        order: [
          ['title', 'ASC'], // Trier les quizzes par titre en ordre alphabétique
        ]
      });

      // Rendre la vue 'home' en passant les quizzes récupérés
      res.render("home", {
        quizz
      });

    } catch (error) {
      // En cas d'erreur, afficher la page d'erreur 500
      res.status(500).render('error500');
    }
  }
};

module.exports = mainController;