const express = require("express");
const entries = express.Router();
const {
    getAllEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
} = require("../queries/entries")

const {
    checkBoolean,
    checkDate,
    checkDescription,
    checkPatient,
} = require("../validations/checkEntries");
const checkEntries = require("../validations/checkEntries");



// =====  INDEX OF ALL ENTRIES =====
entries.get("/", async(req,res)=>{
    const allEntries = await getAllEntries();
    if(allEntries[0]) {
        res.status(200).json(allEntries);
    } else {
        res.status(500).json({ error: "server error" });
    }
});

// =====  SHOW ONE ENTRY =====
entries.get("/entry/:id", async(req,res)=>{
    const id = req.params.id;
    const entry = await getEntry(id);
    if(entry) {
        res.json(entry);
    } else {
        res.status(404).json({ error: "id not found" });
    }
});


// =====  CREATE  =====
entries.post("/", checkBoolean, checkDate, checkDescription, checkPatient, async(req,res)=> {
    try{
        const entry = await createEntry(req.body);
        res.json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message || "Bad Request" });
    }
});


// =====  EDIT/UPDATE/PUT  =====
entries.put('/:id', checkBoolean, checkDate, checkDescription, checkPatient, async(req,res)=> {
    const id = req.params.id;
    const updatedEntry = await updateEntry(id, req.body);
    res.status(200).json(updatedEntry);
});


// =====  DELETE  =====
entries.delete(':id', async(req, res) => {
    const id = req.params.id;
    const deletedEntry = await deleteEntry(id);
    if (deletedEntry.id) {
        res.status(200).json(deletedEntry);
    } else {
        res.status(404).json.apply("Entry not found.");
    }
});

module.exports = entries;