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
        return res.status(404).json(deletedEntry) ;
    }
};

// === CREATE AN ENTRY ===
const createEntry = async(entry) => {
    try {
        const newEntry = await db.one(
            "INSERT INTO entries (patient, service_date, description, cost, insurance, status, sentto_how, sentto_when, claimnumber, eob, notes) VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'), $3, $4, $5, $6, $7, TO_DATE($8, 'YYYY-MM-DD'), $9, $10, $11) RETURNING *",
            [entry.patient, entry.service_date, entry.description, entry.cost, entry.insurance, entry.status, entry.sentto_how, entry.sentto_when, entry.claimnumber, entry.eob, entry.notes]
        );
        return newEntry; 
    } catch (error) {
        return error;
    }
};


// === EDIT AN ENTRY (UPDATE) ===
const updateEntry = async(id, entry) => {
    try {
        const sentToWhenValue = entry.sentto_when ? `TO_DATE($8, 'YYYY-MM-DD')` : 'NULL';
        
        const updatedEntry = await db.one(
            "UPDATE entries SET patient=$1, service_date=TO_DATE($2, 'YYYY-MM-DD'), description=$3, cost=$4, insurance=$5, status=$6, sentto_how=$7, sentto_when=" + sentToWhenValue + ", claimnumber=$9, eob=$10, notes=$11 RETURNING *",
            [entry.patient, entry.service_date, entry.description, entry.cost, entry.insurance, entry.status, entry.sentto_how, entry.sentto_when, entry.claimnumber, entry.eob, entry.notes, id]
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



// === SPECIFIC SEARCHES ===
const billsToSendToInsurance = async() => {
    try{
        const allEntries = await db.any("SELECT * FROM entries WHERE status NOT LIKE '%done%'");
        return allEntries;
    } catch (error) {
        return error;
    }
}



module.exports = { 
    getAllEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    billsToSendToInsurance,
} 