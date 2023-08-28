
const checkRequiredField = (req, res, next, fieldName, errorMessage) => {
    if (req.body[fieldName]) {
        next();
    } else {
        res.status(400).json({ error: errorMessage });
    }
};


const checkBoolean = (req, res, next) => {
    const { eob } = req.body;
    const validBooleanValues = [ true, false, ""];
    if (validBooleanValues.includes(eob)) {
      next();
    } else {
      res.status(400).json({ error: "eob must be a boolean value" });
    }
  };


  module.exports = {
    checkBoolean,
    checkPatient: (req, res, next) => checkRequiredField(req, res, next, 'patient', 'The name of the patient is required.'),
    // checkDate: (req, res, next) => checkRequiredField(req, res, next, 'date', 'The date of service is required.'),
    checkDescription: (req, res, next) => checkRequiredField(req, res, next, 'description', 'What was this for? The description is required.'),
  };