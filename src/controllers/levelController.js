const { Level, Question } = require("../models/index.js");

const levelController = {
    // Afficher la page des niveaux
    renderLevelPage: async (req, res) => {
        try {
            const levels = await Level.findAll(); // Récupérer tous les niveaux
            const message = req.session.message;
            delete req.session.message; // Effacer le message après l'avoir récupéré
            res.render("levels", { levels, message });
        } catch (error) {
            console.error(error);
            res.status(500).render('error500');
        }
    },

    // Créer un nouveau niveau
    createLevel: async (req, res) => {
        try {
            const { name } = req.body;
            const existingLevel = await Level.findOne({ where: { name } });

            if (existingLevel) {
                req.session.message = 'Ce niveau existe déjà';
            } else {
                await Level.create({ name });
                req.session.message = 'Niveau créé avec succès';
            }
            res.redirect('/levels');
        } catch (error) {
            console.error(error);
            req.session.message = 'Une erreur est survenue lors de la création du niveau';
            res.redirect('/levels');
        }
    },

    // Supprimer un niveau
    deleteLevel: async (req, res) => {
        try {
            const level = await Level.findByPk(req.params.id, {
                include: [{ association: "questions", attributes: ["id"] }]
            });

            if (!level) {
                req.session.message = 'Niveau non trouvé';
                return res.redirect('/levels');
            }
    
            if (level.questions && level.questions.length > 0) {
                req.session.message = 'Ce niveau est associé à des questions et ne peut pas être supprimé';
            } else {
                await level.destroy();
                req.session.message = 'Niveau supprimé avec succès';
            }
    
            res.redirect('/levels');
        } catch (error) {
            console.error(error);
            req.session.message = 'Une erreur est survenue lors de la suppression du niveau';
            res.redirect('/levels');
        }
    },

    // Afficher la page d'édition d'un niveau
    renderEditLevelPage: async (req, res) => {
        try {
            const editLevel = await Level.findByPk(req.params.id);
            if (!editLevel) {
                req.session.message = 'Niveau non trouvé';
                return res.redirect('/levels');
            }
            res.render("level", { editLevel, message: req.session.message });
            delete req.session.message;
        } catch (error) {
            console.error(error);
            res.status(500).render('error500');
        }
    },

    // Modifier un niveau
    editLevel: async (req, res) => {
        try {
            const { name } = req.body;
            const levelToUpdate = await Level.findByPk(req.params.id);
    
            if (!levelToUpdate) {
                req.session.message = 'Niveau non trouvé';
                return res.redirect('/levels');
            }
    
            const existingLevel = await Level.findOne({ where: { name } });
    
            if (existingLevel && existingLevel.id !== parseInt(req.params.id)) {
                req.session.message = 'Ce nom de niveau existe déjà';
                return res.redirect('/levels');
            }
    
            await levelToUpdate.update({ name });
            req.session.message = 'Niveau modifié avec succès';
            res.redirect('/levels');
        } catch (error) {
            console.error(error);
            req.session.message = 'Une erreur est survenue lors de la modification du niveau';
            res.redirect(`/levels/${req.params.id}/edit`);
        }
    }
};

module.exports = levelController;