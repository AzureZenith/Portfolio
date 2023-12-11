CREATE DATABASE IF NOT EXISTS `triage`;

CREATE TABLE `room` (
  `roomID` int NOT NULL AUTO_INCREMENT,
  `building` varchar(45) NOT NULL,
  `floor` tinyint(1) NOT NULL,
  `roomNumber` int NOT NULL,
  PRIMARY KEY (`roomID`),
  UNIQUE KEY `roomNumberPerBuilding` (`building`,`roomNumber`)
);

CREATE TABLE `doctor` (
  `doctorID` int NOT NULL AUTO_INCREMENT,
  `fName` varchar(45) DEFAULT NULL,
  `lName` varchar(45) DEFAULT NULL,
  `SIN` int NOT NULL,
  `specialization` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctorID`)
);

CREATE TABLE `patient` (
  `patientID` int NOT NULL AUTO_INCREMENT,
  `healthcard` int DEFAULT NULL,
  `versionCode` varchar(2) DEFAULT NULL,
  `fName` varchar(45) DEFAULT NULL,
  `lName` varchar(45) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `currentAddress` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patientID`),
  UNIQUE KEY `unique_healthcards` (`healthcard`,`versionCode`)
);

CREATE TABLE `visit` (
  `visitID` int NOT NULL AUTO_INCREMENT,
  `patientID_fk` int DEFAULT NULL,
  `doctorID_fk` int DEFAULT NULL,
  `roomID_fk` int DEFAULT NULL COMMENT 'NULL here represents the waiting room.',
  `arrivalTime` datetime NOT NULL COMMENT 'When the patient arrives and starts waiting.',
  `seenByDoctor` datetime DEFAULT NULL COMMENT 'When the patieent was seen by a doctor. This could be before or after they are assigned a room other than "Null" (which would represent the waiting room).',
  `discharged` datetime DEFAULT NULL COMMENT 'When all medical services for this visit have been completed, the patient can leave and the doctor can tend to other matters.',
  PRIMARY KEY (`visitID`)
);

CREATE TABLE `symptoms` (
  `symptomsID` int NOT NULL AUTO_INCREMENT,
  `visitID_fk` int NOT NULL,
  `afflictedArea` varchar(45) DEFAULT NULL COMMENT 'Location on body where patient is experiencing symptom.',
  `description` varchar(45) DEFAULT NULL COMMENT 'Nature of the symptom, such as affected body functions, visible changes, type of sensation etc.',
  `painLevel` int DEFAULT NULL COMMENT 'Pain experienced on a scale from 1-10.',
  PRIMARY KEY (`symptomsID`),
  KEY `visitID_fk_idx` (`visitID_fk`),
  CONSTRAINT `visitID_fk` FOREIGN KEY (`visitID_fk`) REFERENCES `visit` (`visitID`)
);