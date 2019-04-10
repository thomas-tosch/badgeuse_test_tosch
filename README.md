# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
   
## PRÉ-REQUIS ##

* DOCKER

où

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)


# PREMIERE SOLUTION : #


## ÉTAPE 1 : Installer Docker ##

  Linux basé sur Debian : https://docs.docker.com/install/linux/docker-ce/debian/

  MacOS : https://docs.docker.com/docker-for-mac/install/


## ÉTAPE 2 : Démarrer l'ensemble ##


  ``docker-compose up``

# SECONDE SOLUTION : #
  
## ÉTAPE 1 : Installer la base de donnée ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.


## ÉTAPE 2 : Lancer le serveur ##
  
    
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


## ENVIRONNEMENT DEV : EN CAS DE PROBLEME ##

  Régler dans phpMyAdmin pour l'utilisateur uhaSQL un nom d'hôte en localhost.

  Ensuite, changer la fin du fichier -> server/config/config.js 
  
  ``// exports.auth = AUTH;``

  ``exports.auth = AUTHDEV``