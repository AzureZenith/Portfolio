CREATE SCHEMA IF NOT EXISTS `triage_schema`;
USE `triage_schema`;

CREATE TABLE IF NOT EXISTS tblDoctor (
    doctorID INT AUTO_INCREMENT,
    name VARCHAR(45),
    SIN INT,
    specialization VARCHAR(45),

    PRIMARY KEY (doctorID)
);

CREATE TABLE IF NOT EXISTS tblPatient (
    patientID INT AUTO_INCREMENT,
    name VARCHAR(45),
    healthcardNumber INT,
    versionCode VARCHAR(2),

    PRIMARY KEY (patientID)
);

CREATE TABLE IF NOT EXISTS tblSymptom (
    symptomID INT AUTO_INCREMENT,
	visitID INT,
    afflictedArea VARCHAR(45),
    description VARCHAR(45),
    painLevel INT,

    PRIMARY KEY (symptomID),
    FOREIGN KEY (visitID) REFERENCES tblVisit.visitID
);

CREATE TABLE IF NOT EXISTS tblVisit (
    visitID INT AUTO_INCREMENT,
	patientID INT,
	doctorID INT,

    PRIMARY KEY (visitID)
);

CREATE TABLE IF NOT EXISTS tblRoom (
    roomID INT,
    building VARCHAR(45),
    floor SMALLINT,
    roomNumber INT,

    PRIMARY KEY (roomID)
);