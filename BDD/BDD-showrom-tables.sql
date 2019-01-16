DROP DATABASE IF EXISTS showroom;
CREATE DATABASE IF NOT EXISTS showroom;
USE showroom;

CREATE USER IF NOT EXISTS 'uhaSQL'@'localhost' IDENTIFIED BY 'uha';
GRANT ALL PRIVILEGES ON showroom . * TO 'uhaSQL'@'localhost';

CREATE TABLE roles (
	id_role SMALLINT NOT NULL AUTO_INCREMENT,
	nom_role VARCHAR(255) NOT NULL,
	permission_role INT NOT NULL,
	PRIMARY KEY (id_role)
)
Engine = INNODB;

CREATE TABLE users (
	id_user SMALLINT NOT NULL AUTO_INCREMENT,
	prenom_user VARCHAR(255) NOT NULL,
	nom_user VARCHAR(255) NOT NULL,
	pseudo_user VARCHAR(255) DEFAULT "pseudo de l'utilisateur" NOT NULL,
	mail_user VARCHAR(255) NOT NULL,
	mdp_user VARCHAR(255) DEFAULT NULL,
	mdp_temp_user VARCHAR(255) DEFAULT "914ad87dce80aa7c9858f26619746013da575f97" NULL,
	id_role SMALLINT NOT NULL,
	PRIMARY KEY (id_user),
	CONSTRAINT fk_users_id_user
		FOREIGN KEY (id_role)
		REFERENCES roles(id_role)
)
Engine = INNODB;

CREATE TABLE apps (
	id_app INT NOT NULL AUTO_INCREMENT,
	nom_app VARCHAR(255) NOT NULL,
	montrer_app SMALLINT DEFAULT 1 NOT NULL,
	hash_app VARCHAR(255),
	description_app VARCHAR(255) NOT NULL,
	portPrincipal_app SMALLINT,
	PRIMARY KEY (id_app)
)
Engine = INNODB;

CREATE TABLE users_apps (
	id_user SMALLINT NOT NULL,
	id_app INT NOT NULL,
	user_montrer_app SMALLINT DEFAULT 1 NOT NULL,
	PRIMARY KEY (id_user, id_app),
	CONSTRAINT fk_users_apps_id_user
		FOREIGN KEY (id_user)
		REFERENCES users(id_user)
		ON DELETE CASCADE,
	CONSTRAINT fk_users_apps_id_app
		FOREIGN KEY (id_app)
		REFERENCES apps(id_app)
		ON DELETE CASCADE
)
Engine = INNODB;

INSERT IGNORE INTO `roles` (`id_role`, `nom_role`, `permission_role`) VALUES
(1, 'Etudiant', 10384),
(2, 'Intervenant', 10384),
(3, 'Administrateur', 16369);


INSERT IGNORE INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES
('Administrateur', 'temporaire', 'admin@uha.fr', 3),
('Florent', 'Bourgeois', 'florent.bourgeois@uha.fr', 3),
('Daniel', 'Da Fonseca', 'daniel.da-fonseca@uha.fr', 3);
