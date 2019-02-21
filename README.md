# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
   
## PRÉ-REQUIS ##

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)

## ÉTAPE 1 : REGLAGE ADRESSE ##
  
  Il y a 3 fichier à vérifier avant d'installer le projet sur un serveur. Il faut s'assurer que l'adresse du serveur correspond.
  
  Dans le fichier: 
  
   - `./client/src/app/service/express.service.ts : ligne 10 `=> la variable `ip` doit être l'adresse de votre serveur.
   - `./server/config/config.js : ligne 5 `=> la variable `ip` doit être l'adresse de votre serveur.
   - `./index.js => ligne 10`=> assurez-vous que cette ligne n'est pas commenté (la ligne 9, elle, doit être commenté).
  
## ÉTAPE 2 : COMPILATION ANGULAR ##
  
  Depuis le dossier client, dans un terminal, éxecutez la commande suivante:
  
  `ng build --prod`
  
  Celle-ci sert à compiler la partie angular définitivement. Une fois terminer et qu'il n'y a aucune erreur, vous trouverez la compilation final dans le dossier `./client/dist/`
  
  
## ÉTAPE 3 : BDD ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.


## ÉTAPE 4 : GO TO SERVER ##
  
  Sur le serveur, mettez les éléments suivant:
  
    - le dossier client que vous venez de compiler,
    - le dossier server,
    - le fichier index.js,
    - le fichier package.json
    
  Enfin, éxecutez la commande suivante depuis la racine du projet:
  
  `npm install` 
  
  `npm install -g pm2`
  
  Pour lancer pm2:
  
  `pm2 start index.js --name badgeuse`
  
  
## BONUS : INFO ##

   #### Quelque commande de pm2: ####
   
   `pm2 restart badgeuse` -> redémarre le service 'badgeuse', neccessaire pour toute modification du backend
   
   `pm2 stop badgeuse` -> arrête le service 'badgeuse'
   
   `pm2 delete badgeuse` -> supprime le service 'badgeuse'
   
   `pm2 log` -> affiche les logs de pm2 (ctrl + C pour quitter)
   
   `pm2 flush` -> efface tous les logs de pm2