const db = require("../db/dbconfig");

// === GET ALL ENTRIES (INDEX) ===
const getAllEntries = async() => {
    try{
        const allEntries = await db.any("SELECT * FROM entries");
        return allEntries;
    } catch (error) {
        return error;
    }
}

// reminder to self:  db.any is returning a promise. the AWAIT here is saying to wait and don't return anything until all promises are resolved.


// === GET ONE ENTRY (SHOW) ===
const getEntry = async(id) => {
    try{
        const oneEntry = await db.one("SELECT * FROM entries WHERE id=$1", id);
        return oneEntry;
    } catch (error) {
        return { error: "entry not found" };
    }
};

// === CREATE AN ENTRY ===
const createEntry = async(entry) => {
    try {
        const newEntry = await db.one(
            "INSERT INTO entries (patient, service_date, description, cost, insurance, status, sentto_how, sentto_when, claimnumber, EOB, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [entry.patient, entry.service_date, entry.description, entry.cost, entry.insurance, entry.status, entry.sentto_how, entry.sentto_when, entry.claimnumber, entry.EOB, entry.notes]
        );
        return newEntry; 
    } catch (error) {
        return error;
    }
};


// === EDIT AN ENTRY (UPDATE) ===
const updateEntry = async(id, entry) => {
    try {const updatedEntry = await db.one(
            "UPDATE entries SET patient=$1, service_date=$2, description=$3, cost=$4, insurance=$5, status=$6, sentto_how=$7, sentto_when=$8, claimnumber=$9, EOB=$10, notes=$11 RETURNING *",
            [entry.patient, entry.service_date, entry.description, entry.cost, entry.insurance, entry.status, entry.sentto_how, entry.sentto_when, entry.claimnumber, entry.EOB, entry.notes, id]
        );
            return updatedEntry; 
        } catch (error) {
            return error;
            }
};


// === DELETE AN ENTRY (DESTROY) ===
const deleteEntry = async(id) => {
    try {const deletedEntry = await db.one(
        "DELETE FROM entries WHERE id = $1 RETURNING *", id
    );
    return deletedEntry;
    } catch(error){
        return error;
        }
};


module.exports = { 
    getAllEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
} 