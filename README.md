# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
Documentation située dans ./server/out/index.html (seulement UUID pour le moment) 
## PRÉ-REQUIS ##

* DOCKER

où

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)


# PREMIERE SOLUTION (DEV) #


## ÉTAPE 1 : Installer Docker ##

  Linux basé sur Debian : https://docs.docker.com/install/linux/docker-ce/debian/

  MacOS : https://docs.docker.com/docker-for-mac/install/

## ÉTAPE 2 : Configurer son Host ##

Dans le fichier docker-compole.yml, dans la partie node change le commentaire de HOST_ANGULAR et met ton adresse IP locale.
Ensuite si tu veux pas compiler le web avec Angular pour que ça prenne moins de temps, met en commentaire le service web toujours dans docker-compose.yml ainsi que phpmyadmin, 
et ensuite dans l'environnement de node, change le port angular en mettant `4200` et remplace ton adresse IP par `localhost` pour le host.

Pour finir rien de plus simple, tu ouvres un terminal, tu te places dans le dossier client et tu fais un 'ng serve' et tout fonctionne (normalement !)

## ÉTAPE 3 : Démarrer l'ensemble ##


  ``docker-compose up``
  
  Après avoir démarrer l'ensemble il est nécessaire de régler la base de donnée pour accepter les requêtes local (les explications sont données en fin de fichier). 
  
  Les fichiers Docker ont été prévus pour un environnement de développement, pour l'utiliser en production il est nécessaire de changer les volumes en copy.


# SECONDE SOLUTION (DEV/PROD) #
  
## ÉTAPE 1 : Installer la base de donnée ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.

## ÉTAPE 2 : Configurer son Host ##

Dans le fichier docker-compole.yml, dans la partie node change le commentaire de HOST_ANGULAR et met ton adresse IP locale.

Ensuite si tu veux pas compiler le web avec Docker, tu peux le faire avec Angular pour que ça prenne moins de temps.
 
Pour ça, met en commentaire le service web toujours dans docker-compose.yml ainsi que phpmyadmin,
et ensuite dans l'environnement de node, change le port angular en mettant `4200` et remplace ton adresse IP par `localhost` pour le host.

## ÉTAPE 3 : Lancer le serveur ##
  
    
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


## ENVIRONNEMENT DEV ##

  Régler dans phpMyAdmin pour l'utilisateur uhaSQL un nom d'hôte en localhost.

  Ensuite, changer la fin du fichier -> server/config/config.js 
  
  ``// exports.auth = AUTH;``

  ``exports.auth = AUTHDEV``
