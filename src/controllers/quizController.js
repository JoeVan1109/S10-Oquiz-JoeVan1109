const { Quiz } = require("../models/index.js");

const quizController = {
  // Méthode pour afficher la page d'un quiz spécifique
  renderQuizPage: async (req, res) => {
    try {
      // Récupérer un quiz spécifique par son ID
      const quizz = await Quiz.findByPk(req.params.id, {
        include: [
          "author",  // Inclure les informations de l'auteur
          "tags",    // Inclure les tags associés au quiz
          {
            association: "questions",  // Inclure les questions du quiz
            include: [
              "propositions",  // Inclure les propositions (réponses possibles) pour chaque question
              "level"          // Inclure le niveau de difficulté de chaque question
            ]
          }
        ]
      });

      // Rendre la vue 'quiz' en passant les données du quiz récupéré
      res.render("quiz", {
        quizz
      });

    } catch (error) {
      // En cas d'erreur, afficher la page d'erreur 500
      res.status(500).render('error500');
    }
  }
};

module.exports = quizController;