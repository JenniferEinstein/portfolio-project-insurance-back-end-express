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
    // checkDate,
    checkDescription,
    checkPatient,
} = require("../validations/checkEntries");

const checkEntries = require("../validations/checkEntries");


const getDistinctPatients = async () => {
try {
    const patients = await db.any("SELECT DISTINCT patient FROM entries");
    return patients.map((entry) => entry.patient);
} catch (error) {
    return error;
}
};

const searchEntries = async (req, res) => {
    const {queryType} = req.query;
    try {
        if (queryType === "billsByPatient") {
            const patients = await getDistinctPatients();
            res.status(200).json(patients)
        } else if (queryType === "billsToSendToInsurance"){
            const billsToSend = allEntries.filter((entry) => entry.status !== "done");
            res.status(200).json(billsToSend);
        } else if (queryType === "waitingToHearFromInsurance") {
            const waitingToHear = allEntries.filter((entry) => entry.status == "Sent to insurance");
            res.status(200).json(waitingToHear);
        } else if (queryType === "billsFrom2023") {
            // Implement the logic for this query
            // You can similarly add more conditions for different query types 
        } else {
            // Handle the case where the queryType is not recognized
            res.status(400).json({ error: "Invalid queryType" });
          }
        } catch (error) {
          res.status(500).json({ error: "Server error" });
        }
      };





      

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
entries.post("/", checkBoolean, checkDescription, checkPatient, async(req,res)=> {
    try{
        const entry = await createEntry(req.body);
        res.json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message || "Bad Request" });
    }
});


// =====  EDIT/UPDATE/PUT  =====
entries.put('/:id', checkBoolean, checkDescription, checkPatient, async(req,res)=> {
    const id = req.params.id;
    const updatedEntry = await updateEntry(id, req.body);
    res.status(200).json(updatedEntry);
});


// =====  DELETE  =====
entries.delete('/entry/:id', async(req, res) => {
    const id = req.params.id;
    const deletedEntry = await deleteEntry(id);
    if (deletedEntry.id) {
        res.status(200).json(deletedEntry);
    } else {
        res.status(404).json( {error: "Entry not found."} );
    }
});



// ========== OTHER ===========
const billsToSendToInsurance = async (req, res) => {
    try {
      const allEntries = await getAllEntries();
      const billsToSend = allEntries.filter(
        (entry) => entry.status !== "done"
      );
  
      res.status(200).json(billsToSend);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

module.exports = {
    entries,
    billsToSendToInsurance,
    searchEntries,
};