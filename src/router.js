const express = require("express");
const { Router } = express;

// Importation des middlewares
const authMiddleware = require('./middleware/authMiddleware');
const checkRole = require('./middleware/checkRole');

// Importation des contrôleurs
const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const tagsController = require("./controllers/tagsController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const levelController = require("./controllers/levelController");

// Création d'une nouvelle instance de Router
const router = Router();

// Routes principales
router.get("/", mainController.renderHomePage);
router.get("/tags", tagsController.renderTagsPage);

// Routes d'inscription
router.get("/signup", signupController.renderSignUpForm);
router.post("/signup", signupController.signUpPage);

// Routes de connexion
router.get("/login", loginController.renderLoginPage);
router.post("/login", loginController.loginPage);

// Routes de profil
router.get("/profil/:id", loginController.renderProfilPage);
router.get("/profil/:id", signupController.renderProfilPage);

// Route de quiz (protégée par authentification et vérification de rôle)
router.get("/quiz/:id", authMiddleware, checkRole(['professeur', 'etudiant']), quizController.renderQuizPage);

// Routes de niveaux
router.get("/levels", levelController.renderLevelPage);
router.post("/levels", levelController.createLevel);
router.post("/level/:id/delete", levelController.deleteLevel);
router.get("/level/:id/edit", levelController.renderEditLevelPage);
router.post("/level/:id/update", levelController.editLevel);

module.exports = router;