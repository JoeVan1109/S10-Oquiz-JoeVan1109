// Charger les variables d'environnement depuis le fichier .env
const dotenv = require("dotenv");
dotenv.config();

// Importer les dépendances nécessaires
const express = require("express");
const router = require("./src/router");
const session = require("express-session");

// Créer une nouvelle application Express
const app = express();

// Configurer le moteur de vue EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Rendre le contenu du dossier 'public' accessible publiquement
// Cela permet de servir des fichiers statiques comme CSS, images, etc.
app.use(express.static("public"));

// Configurer le middleware pour analyser les données des formulaires POST
app.use(express.urlencoded({ extended: true }));

// Configurer les sessions pour gérer l'état de l'utilisateur
app.use(session({
  secret: 'croquettes', // Clé secrète pour signer la session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Sécuriser les cookies en production
}));

// Utiliser le routeur pour gérer les routes de l'application
app.use(router);

// Gérer les erreurs 404 (page non trouvée)
app.use((req, res) => {
  res.status(404).render('error404');
});

// Démarrer le serveur
const port = process.env.PORT || 3000; // Utiliser le port défini dans .env ou 3000 par défaut
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});