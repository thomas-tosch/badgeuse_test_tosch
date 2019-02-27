# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
   
## PRÉ-REQUIS ##

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)


  
## ÉTAPE 1 : BDD ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.


## ÉTAPE 2 : GO TO SERVER ##
  
    
  A la racine du projet, éxecutez les commandes suivantes:
  
  `npm install` 
  
  `npm install -g pm2`
  
  Pour lancer pm2:
  
  `pm2 start index.js --name badgeuse`
  
  # IMPORTANT #
  
  3 ports doivent être disponible:
  
     - port 80
     - port 8080
  
  Pour que pm2 se relance automatiquement après un down server, éxecutez les commandes suivantes:
  
  `pm2 startup`
   
  `pm2 save` 
  
  
## BONUS : INFO ##

   #### Quelque commande de pm2: ####
   
   `pm2 restart badgeuse` -> redémarre le service 'badgeuse', neccessaire pour toute modification du backend
   
   `pm2 stop badgeuse` -> arrête le service 'badgeuse'
   
   `pm2 delete badgeuse` -> supprime le service 'badgeuse'
   
   `pm2 log` -> affiche les logs de pm2 (ctrl + C pour quitter)
   
   `pm2 flush` -> efface tous les logs de pm2


## BONUS : EN CAS DE PROBLEME ##

   Vérifier bien dans le fichier ./server/config/config.js que la 'con AUTHDEV' est bien supprimer et que l'exports.auth est bien sur la 'const AUTH'.
