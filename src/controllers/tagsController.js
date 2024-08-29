const { Tag, Quiz } = require("../models/index.js");

const tagsController = {
  // Méthode pour afficher la page des tags
  renderTagsPage: async (req, res) => {
    try {
      // Récupérer tous les tags avec les quizzes associés
      const tags = await Tag.findAll({
        include: [
          { model: Quiz, as: 'quizzes'},
        ]
      });

      // Rendre la vue 'tags' en passant les tags récupérés
      res.render("tags", {
        tags
      });

      // Code commenté pour le débogage
      // tags.forEach(tag => {
      //   console.log(`Tag: ${tag.name}`);
      //   console.log('Quizzes:', JSON.stringify(tag.quizzes, null, 2));
      // });

    } catch (error) {
      // En cas d'erreur, afficher la page d'erreur 500
      res.status(500).render('error500');
    }
  }
};

module.exports = tagsController;