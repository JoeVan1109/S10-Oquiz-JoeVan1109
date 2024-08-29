# S10-Oquiz

Ce projet ne suit peut être pas à 100% la ligne du prof mais répond aux consignes du projet. Il est complêté avec des commentaires pour chaque fichier de code.

Les notions  préconisées en cours valent + que les notions due ce projet donc si le formateur conseille autre chose, il faut privilégier les conseils du formateur.

Pour utiliser toutes les fonctionnalités, voici les identifiants de connexion de l'utilisateur professeur qui a tout les droits: 

email: prof@gmail.com
mot de passe : test

Il est possible de créer un nouvel utilisateur et de lui donner les permissions qu'on souhaite dans l'onglet S'inscrire du site.

## Notions du projet

1 - Architecture MVC (Modèle-Vue-Contrôleur) :

  - But : Séparer la logique de l'application en trois composants interconnectés.

  - Importance : Améliore la maintenabilité, la réutilisabilité du code et facilite le développement en équipe.

---

2 - ORM (Object-Relational Mapping) avec Sequelize :

  - But : Simplifier l'interaction avec la base de données en utilisant des objets JavaScript.

  - Importance : Réduit la complexité des requêtes SQL, améliore la sécurité et facilite la gestion des relations entre tables.

---

3 - Système d'authentification :

  - But : Permettre aux utilisateurs de s'inscrire, se connecter et accéder à des fonctionnalités personnalisées.

  - Importance : Essentiel pour la sécurité et la personnalisation de l'expérience utilisateur.

---

4 - Gestion des rôles et des permissions (RBAC - Role-Based Access Control) :

  - But : Contrôler l'accès aux différentes parties de l'application en fonction des rôles des utilisateurs.

  - Importance : Permet une gestion fine des autorisations et améliore la sécurité de l'application.

---

5 - Middleware d'authentification et d'autorisation :

  - But : Vérifier l'authentification et les permissions des utilisateurs avant d'accéder à certaines routes.

  - Importance : Renforce la sécurité et simplifie la gestion des accès dans toute l'application.

---

6 - Migrations de base de données :

  - But : Gérer les changements de structure de la base de données de manière contrôlée et versionnée.

  - Importance : Facilite la collaboration, le déploiement et le suivi des modifications de la base de données.

---

7 - Sessions utilisateur :

  - But : Maintenir l'état de connexion des utilisateurs à travers les requêtes.

  - Importance : Permet une expérience utilisateur fluide et sécurisée.

---

8 - Hachage des mots de passe :

  - But : Sécuriser le stockage des mots de passe des utilisateurs.

  - Importance : Protège les informations sensibles des utilisateurs en cas de fuite de données.

---

9 - Relations many-to-many :

  - But : Gérer des relations complexes entre entités (ex: utilisateurs et rôles).

  - Importance : Permet une modélisation flexible et réaliste des données.

---

10 - Gestion des erreurs :

  - But : Traiter gracieusement les erreurs et fournir des retours appropriés aux utilisateurs.

  - Importance : Améliore l'expérience utilisateur et facilite le débogage.

---

11 - Templating avec EJS :

  - But : Générer dynamiquement des pages HTML côté serveur.

  - Importance : Permet de créer des vues dynamiques et réutilisables.

---

12 - Routing :

  - But : Définir et gérer les différentes routes de l'application.

  - Importance : Organise la structure de l'application et facilite la navigation.

## Les seeders et les migrations sont créer automatiquement en faisant ces étapes(ca créer tout ce qu'il faut pour les roles et permissions) :

1 - Configurer le .sequelizerc :

Créez un fichier .sequelizerc à la racine de votre projet : 
    
```
touch .sequelizerc
```
    
Éditez ce fichier pour spécifier les chemins :

```
const path = require('path');
module.exports = {
'config': path.resolve('config', 'config.js'),
'models-path': path.resolve('src', 'models'),
'seeders-path': path.resolve('src', 'seeders'),
'migrations-path': path.resolve('src', 'migrations')
};
```

2 - Créer le fichier de configuration :

```
mkdir config
touch config/config.js
```

Éditez config.js pour configurer votre base de données.

3 - Générer un seeder :

```
npx sequelize-cli seed:generate --name nom-du-seeder

```

4 - Cela créera un fichier dans le dossier seeders.

Éditer le seeder avec les roles qu'on souhaite :

```
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('role', [
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'moderator',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};
```

5 - Ouvrez le fichier généré et ajoutez vos données de test.

Exécuter les seeders :

```
npx sequelize-cli db:seed:all
```

Pour annuler les seeders :

```	
npx sequelize-cli db:seed:undo:all
```

## Structure du projet

```
project_root/

- config/
  - config.js

- data/
  - create_tables.sql
  - populate_tables.sql

- public/
  - css/
    - styles.css

- src/

  - controllers/
    - loginController.js
    - quizController.js
    - tagsController.js
    - signupController.js
    - mainController.js
    - levelController.js

  - views/
    - admin.ejs
    - error404.ejs
    - error500.ejs
    - login.ejs
    - home.ejs
    - quiz.ejs
    - tags.ejs
    - signup.ejs
    - profil.ejs
    - level.ejs
    - levels.ejs

    - partials/
      - header.ejs
      - footer.ejs

  - router.js

  - sequelize-client.js

  - middlewares/
    - authMiddleware.js
    - checkRole.js
  
  - models/
    - index.js
    - User.js
    - Role.js
    - Permission.js
    - Quiz.js
    - Tag.js
    - Question.js
    - Answer.js
    - Level.js

- seeders/
  - 20240828124629-init-roles-and-permissions.js

- migrations/
  - 20240828123117-create-role-table.js
  - 20240828123353-create-permission-table.js
  - 20240828123405-create-user-role-table.js
  - 20240828123414-create-role-permission-table.js

- .env
- .gitignore
- .sequelizerc
- index.js
- package.json
- README.md
```