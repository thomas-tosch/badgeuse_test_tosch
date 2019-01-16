
USE showroom;





CREATE TABLE user_groups (
	id_group SMALLINT NOT NULL AUTO_INCREMENT,
	nom_group VARCHAR(255) NOT NULL,
	PRIMARY KEY (id_group)
)
Engine = INNODB;

CREATE TABLE users_badger (
	id_user SMALLINT NOT NULL AUTO_INCREMENT,
	mdp_user_badger VARCHAR(255) DEFAULT "$2b$10$heLifc2slq0U8jAuSSu6reQfO6WzwXf/rxl3uGmiUldY2L/D0jbDm" NULL,
	presence BOOLEAN NOT NULL DEFAULT "0",
	keyTemp VARCHAR(255) NULL,
	id_group SMALLINT NOT NULL,
	id_card TEXT DEFAULT NULL,
	PRIMARY KEY (id_user),
	CONSTRAINT fk_users_id_users
		FOREIGN KEY (id_user)
		REFERENCES users(id_user),
	CONSTRAINT fk_users_id_groups
		FOREIGN KEY (id_group)
		REFERENCES user_groups(id_group)
)
Engine = INNODB;


CREATE TABLE badger (
	id_point INT NOT NULL AUTO_INCREMENT,
	id_user SMALLINT NOT NULL,
	start_point DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	end_point DATETIME NULL,
	duration TIME NULL,
	PRIMARY KEY (id_point),
	CONSTRAINT fk_badger_id_user
		FOREIGN KEY (id_user)
		REFERENCES users(id_user)
)
Engine = INNODB;


INSERT IGNORE INTO `user_groups` (`id_group`, `nom_group`) VALUES
(1, '1ere année'),
(2, '2e année'),
(3, '3e année'),
(4, 'résident');




