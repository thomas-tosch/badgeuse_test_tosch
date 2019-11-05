

-- -----------------------------------------------------
-- Table roles
-- -----------------------------------------------------
CREATE TABLE roles (
	id_role SMALLINT NOT NULL AUTO_INCREMENT,
	nom_role VARCHAR(255) NOT NULL,
	permission_role INT NOT NULL,
	PRIMARY KEY (id_role)
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table user_groups
-- -----------------------------------------------------
CREATE TABLE user_groups (
	id_group SMALLINT NOT NULL AUTO_INCREMENT,
	nom_group VARCHAR(255) NOT NULL,
	PRIMARY KEY (id_group)
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table reason
-- -----------------------------------------------------
CREATE TABLE reason (
	id_reason SMALLINT NOT NULL AUTO_INCREMENT,
	nom_reason VARCHAR(255) NOT NULL,
	PRIMARY KEY (id_reason)
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
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
		ON DELETE CASCADE
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table users_extend
-- -----------------------------------------------------
CREATE TABLE users_extend (
	id_user SMALLINT NOT NULL AUTO_INCREMENT,
	id_group SMALLINT NULL,
	card TEXT DEFAULT NULL,
	PRIMARY KEY (id_user),
	CONSTRAINT fk_users_id_users
		FOREIGN KEY (id_user)
		REFERENCES users(id_user)
		ON DELETE CASCADE,
	CONSTRAINT fk_users_id_groups
		FOREIGN KEY (id_group)
		REFERENCES user_groups(id_group)
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table badger
-- -----------------------------------------------------
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
		ON DELETE CASCADE
)
Engine = INNODB;

-- -----------------------------------------------------
-- Table absences
-- -----------------------------------------------------
CREATE TABLE absences (
	id_absences INT NOT NULL AUTO_INCREMENT,
	id_user SMALLINT NOT NULL,
	ref_absence INT NOT NULL,
	id_status TINYINT(1) NOT NULL DEFAULT 2,
	absence_date DATE NOT NULL,
	half_day TINYINT NOT NULL DEFAULT 1,
	id_reason SMALLINT NOT NULL,
	comment_absences VARCHAR(512) NULL,
	certificate VARCHAR(255) NULL,
	raison_refus VARCHAR(255) NULL,
	PRIMARY KEY (id_absences),
	CONSTRAINT fk_absences_id_user
		FOREIGN KEY (id_user)
		REFERENCES users(id_user)
		ON DELETE CASCADE,
	CONSTRAINT fk_absences_id_reason
		FOREIGN KEY (id_reason)
		REFERENCES reason(id_reason)
)
Engine = INNODB;

