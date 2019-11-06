# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
La documentation pour les routes du back se trouve sur ./server/out/index.html (seul UUID est actuellement documentée)
 
## PRÉ-REQUIS ##

* Docker et docker-compose

où

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)


# Déploiement en production (Docker) #

<ol>
   <li>Dans le fichier .env à la racine du projet sélectionnez les ports et mots de passes que vous souhaitez utiliser pour la mise en production.  </Li>
   <li>lancez les containers docker avec la commande **docker-compose up --build**</li>      
</ol>

   TODO
   ~~- [ ] le fichier ./server/config/config.js présente des configurations pour passer aisément du mode dev au mode prod. Il faudra documenter modifier le readme de dev pour en prendre compte~~ 
   
   TODO
   [ ] il faudrait utiliser un fichier d'initialisation de la bdd avec uniquement un administrateur dans le système. 
     





# Déploiement pour le développement (Docker) #

<ol>
   <li>Dans le fichier .env à la racine du projet sélectionnez les ports et mots de passes que vous souhaitez utiliser pour la mise en production.  </Li>
   <li>lancez les containers docker avec la commande **docker-compose -f docker-compose-dev.yml up --build** </li>      
</ol>

Ce déploiment lance le serveur back avec **nodemon** et le serveur front avec **ng serve** avec un motage des dossiers . et ./client ; ce qui permet de répercuter toute modification du code dans les serveurs par recompilation automatique.

Notez que la compilation dans un docker est relativement lente. L'utilisation du déploiment manuel peut permettre d'accélérer le développement.

   TODO
   ~~- [ ] le fichier ./server/config/config.js présente des configurations pour passer aisément du mode dev au mode prod. Il faudra documenter modifier le readme de dev pour en prendre compte~~ 
          

### Etat de la base de donnée au lancement

Au lancement de la version de développement la base de donnée contient plusieurs utilisateurs ainsi que des données de présence / absence sur les mois de septembre et octobre 2019.

Les utilisateurs présent (dont le mot de passe est toujours "uha") : 
- admin@uha.fr : utilisateur administrateur sur la plateforme
- present@uha.fr : un étudiant qui est plutot assidu à la formation
- master@uha.fr : un étudiant inscrit en master 4.0
- alternance@uha.fr : un étudiant qui est en alternance (un mois présent un mois absent)
- commun@uha.fr : un étudiant commun de la formation
- absent@uha.fr : un étudiant qui n'est que très rarement présent à UHA 4.0
- justification@uha.fr : un étudiant qui a souvent des soucis avec la badgeuse et qui a beaucoup d'absences justifiées
- stage@uha.fr : un étudiant qui est en stage 


# Déploiement manuel (deprecated) - SECTION A REVOIR #
  
## ÉTAPE 1 : Installer la base de donnée ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.

## ÉTAPE 2 : Configurer son Host ##

Dans le fichier docker-compose.yml, dans la partie node change le commentaire de HOST_ANGULAR et met ton adresse IP locale.

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



