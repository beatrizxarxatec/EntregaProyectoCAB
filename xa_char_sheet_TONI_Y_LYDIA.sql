CREATE TABLE `student` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(30) NOT NULL,
	`first_surname` varchar(30) NOT NULL,
	`second_surname` varchar(30),
	`email_personal` varchar(60) NOT NULL,
	`email_activa` varchar(60),
	`phone_number` varchar(14) NOT NULL,
	`avatar` blob NOT NULL,
	`cv` blob NOT NULL,
	`description` TEXT(500) NOT NULL,
	`city` varchar(60) NOT NULL,
	`zip_code` varchar(5) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tech_skill` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(15) NOT NULL,
	`max_xp_points` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Job` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(40) NOT NULL,
	`company` varchar(50),
	`start_date` DATE,
	`finish_date` DATE,
	`description` varchar(100) NOT NULL,
	`current_work` BOOLEAN NOT NULL,
	`id_student` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Soft_Skill` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(30) NOT NULL,
	`id_student` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `activa_work_student_rel` (
	`id_student` INT NOT NULL,
	`id_work` INT NOT NULL,
	`xp_points` INT,
	`feedback` TEXT(1000),
	PRIMARY KEY (`id_student`,`id_work`)
);

CREATE TABLE `activa_work` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(60) NOT NULL,
	`description` TEXT(500) NOT NULL,
	`resume` blob,
	PRIMARY KEY (`id`)
);

CREATE TABLE `activa_work_tech_skill_rel` (
	`id_work` INT NOT NULL,
	`id_tech_skill` INT NOT NULL,
	PRIMARY KEY (`id_work`,`id_tech_skill`)
);

CREATE TABLE `Training` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(40) NOT NULL,
	`trainig_center` varchar(50) NOT NULL,
	`start_date` DATE,
	`finish_date` DATE,
	`description` varchar(100) NOT NULL,
	`id_student` INT NOT NULL,
	`duration` INT,
	`regulated` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` varchar(100) NOT NULL,
	`password` varchar(30) NOT NULL,
	`role` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `reward` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_user_sender` INT NOT NULL,
	`id_user_rewarded` INT NOT NULL,
	`xp_points` INT NOT NULL,
	`date` DATE NOT NULL,
	`description` varchar(150) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Job` ADD CONSTRAINT `Job_fk0` FOREIGN KEY (`id_student`) REFERENCES `student`(`id`);

ALTER TABLE `Soft_Skill` ADD CONSTRAINT `Soft_Skill_fk0` FOREIGN KEY (`id_student`) REFERENCES `student`(`id`);

ALTER TABLE `activa_work_student_rel` ADD CONSTRAINT `activa_work_student_rel_fk0` FOREIGN KEY (`id_student`) REFERENCES `student`(`id`);

ALTER TABLE `activa_work_student_rel` ADD CONSTRAINT `activa_work_student_rel_fk1` FOREIGN KEY (`id_work`) REFERENCES `activa_work`(`id`);

ALTER TABLE `activa_work_tech_skill_rel` ADD CONSTRAINT `activa_work_tech_skill_rel_fk0` FOREIGN KEY (`id_work`) REFERENCES `activa_work`(`id`);

ALTER TABLE `activa_work_tech_skill_rel` ADD CONSTRAINT `activa_work_tech_skill_rel_fk1` FOREIGN KEY (`id_tech_skill`) REFERENCES `tech_skill`(`id`);

ALTER TABLE `Training` ADD CONSTRAINT `Training_fk0` FOREIGN KEY (`id_student`) REFERENCES `student`(`id`);

ALTER TABLE `reward` ADD CONSTRAINT `reward_fk0` FOREIGN KEY (`id_user_sender`) REFERENCES `user`(`id`);

ALTER TABLE `reward` ADD CONSTRAINT `reward_fk1` FOREIGN KEY (`id_user_rewarded`) REFERENCES `user`(`id`);
