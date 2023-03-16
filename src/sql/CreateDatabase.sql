
CREATE DATABASE testvocacionalbbdd;

USE testvocacionalbbdd;

CREATE TABLE `testvocacionalbbdd`.`estudiantes` (
  `Est_id` INT NOT NULL AUTO_INCREMENT,
  `Est_nombre` VARCHAR(45) NOT NULL,
  `Est_apellido_uno` VARCHAR(45) NOT NULL,
  `Est_apellido_dos` VARCHAR(45) NOT NULL,
  `Est_edad` INT(3) NOT NULL,
  `Est_sexo` ENUM('MASCULINO', 'FEMENINO') NOT NULL,
  `Est_correo` VARCHAR(155) NOT NULL,
  `Est_nombreInstitucion` VARCHAR(155) NOT NULL,
  PRIMARY KEY (`Est_id`));


CREATE TABLE `testvocacionalbbdd`.`categorias` (
  `Cat_id` INT NOT NULL AUTO_INCREMENT,
  `Cat_nombre` VARCHAR(155) NOT NULL,
  `Est_id` INT NOT NULL,
  PRIMARY KEY (`Cat_id`),
  INDEX `fk_idEstudiantes_idx` (`Est_id` ASC),
  CONSTRAINT `fk_idEstudiantes`
    FOREIGN KEY (`Est_id`)
    REFERENCES `testvocacionalbbdd`.`estudiantes` (`Est_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `testvocacionalbbdd`.`perfiles` (
  `Per_id` INT NOT NULL AUTO_INCREMENT,
  `Per_descripcion` VARCHAR(355) NULL,
  `Cat_id` INT NOT NULL,
  PRIMARY KEY (`Per_id`),
  INDEX `fk_idCategoria_idx` (`Cat_id` ASC),
  CONSTRAINT `fk_idCategoria`
    FOREIGN KEY (`Cat_id`)
    REFERENCES `testvocacionalbbdd`.`categorias` (`Cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);





