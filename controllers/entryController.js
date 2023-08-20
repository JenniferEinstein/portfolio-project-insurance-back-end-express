const express = require("express");
const entries = express.Router();
const {
    
} = require("../queries/entries")

const {
    checkBoolean,
    checkDate,
    checkDescription,
    checkPatient,
} = require("../validations/checkEntries")



// =====  INDEX OF ALL ENTRIES =====



// =====  SHOW ONE ENTRY =====



// =====  CREATE  =====



// =====  EDIT/UPDATE/PUT  =====



// =====  DELETE  =====