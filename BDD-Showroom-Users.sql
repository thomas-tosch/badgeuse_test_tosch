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
	mdp_user VARCHAR(255) DEFAULT "$2b$10$heLifc2slq0U8jAuSSu6reQfO6WzwXf/rxl3uGmiUldY2L/D0jbDm" NULL,
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
('Florent', 'Bourgeois', 'florent.bourgeois@uha.fr', 3),
('Daniel', 'Da Fonseca', 'daniel.da-fonseca@uha.fr', 3),

('Oussama', 'Sadeg', 'oussama.sadeg@uha.fr', 1),
('Jérôme', 'Andre', 'jerome.andre@uha.fr', 1),
('Achraf', 'Haddouch', 'achraf.haddouch@uha.fr', 1),
('Antoine', 'Carette', 'antoine.carette@uha.fr', 1),
('Anthony', 'Schwartz', 'anthony.schwartz@uha.fr', 1),
('Stephane', 'Brichler', 'stephane.brichler@uha.fr', 1),
('Charly', 'Bihel', 'charly.bihel@uha.fr', 1),
('Nicolas', 'Piszewski', 'nicolas.piszewski@uha.fr', 1),
('Florian', 'Biller', 'florian.biller@uha.fr', 1),
('Gauthier', 'Vuillemin', 'gauthier.vuillemin@uha.fr', 1),
('Maxime', 'Rayot', 'maxime.rayot@uha.fr', 1),
('David', 'Khyrmandy', 'david.khyrmandy@uha.fr', 1),
('Quentin', 'Grebe', 'quentin.grebe@uha.fr', 1),
('Florent', 'Haffner', 'florent.haffner@uha.fr', 1),
('Orane', 'Mendes', 'orane.mendes@uha.fr', 1),
('Valentin', 'Fritz', 'valentin.fritz@uha.fr', 1),
('Vincent', 'Meneur', 'vincent.meneur@uha.fr', 1),
('Pierre Louis', 'Braun', 'pierre-louis.braun@uha.fr', 1),
('Ioannis', 'Karapostolis', 'ioannis.karapostolis@uha.fr', 1),
('Florent', 'Keiflin', 'florent.keiflin@uha.fr', 1),
('Chloe', 'Prudham', 'chloe.prudham@uha.fr', 1),
('Franck', 'Hubschwerle', 'franck.hubschwerle@uha.fr', 1),
('Adrien', 'Kolodziej', 'adrien.kolodziej@uha.fr', 1),
('Aghiles', 'Nessah', 'aghiles.nessah@uha.fr', 1),
('Alvin', 'Frey', 'alvin.frey@uha.fr', 1),
('Valentin', 'Tahon', 'valentin.tahon@uha.fr', 1),
('Victor', 'Damiano', 'victor.damiano@uha.fr', 1),
('Luc', 'ratelli', 'luc.ratelli@uha.fr', 1),
('Jimmy', 'Heitz', 'jimmy.heitz@uha.fr', 1),
('Etrit', 'Halili', 'etrit.halili@uha.fr', 1),
('Hélène', 'David', 'helene.david@uha.fr', 1),
('Anthony', 'Spinali', 'anthony.spinali@uha.fr', 1),
('Alexandre', 'Dias-Omonte', 'alexandre.dias-omonte@uha.fr', 1),
('Elodie', 'Balaia', 'elodie.balaia@uha.fr', 1),
('Thomas', 'Tosch', 'thomas.tosch@uha.fr', 1),
('Aurelien', 'Diss', 'aurelien.diss@uha.fr', 1),
('Natan', 'Fourie', 'natan.fourie@uha.fr', 1),
('Alexis', 'Martinez', 'alexis.martinez@uha.fr', 1),
('Christophe', 'Bourgeois', 'christophe.bourgeois@uha.fr', 1),
('Gauthier', 'Staehler', 'gauthier.staehler@uha.fr', 1),
('Kamel', 'Seddik', 'kamel.seddik@uha.fr', 1),
('Mouloud', 'Hammoutène', 'mouloud.hammoutene@uha.fr', 1),
('Rabie', 'Bougedrawi', 'rabie.bougedrawi@uha.fr', 1),
('Valentin', 'Cartier', 'valentin.cartier@uha.fr', 1),
('Thomas', 'Fritsch', 'thomas.fritsch@uha.fr', 1),
('Quentin', 'Kollaros', 'quentin.kollaros@uha.fr', 1),
('Alexandre', 'Royer', 'alexandre.royer@uha.fr', 1),
('Lucas', 'Suhner', 'lucas.suhner@uha.fr', 1),
('Corentin', 'Jacob', 'corentin.jacob@uha.fr', 1),
('Loïc', 'Deverre', 'loic.deverre@uha.fr', 1),

('Etienne', 'Burger', 'etienne_burger@yahoo.fr', 2),
('Jean Francois', 'Roth', 'jean-francois.roth@uha.fr', 2);

