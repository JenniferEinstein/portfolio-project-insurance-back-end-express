
const checkRequiredField = (req, res, next, fieldName, errorMessage) => {
    if (req.body[fieldName]) {
        next();
    } else {
        res.status(400).json({ error: errorMessage });
    }
};


const checkBoolean = (req, res, next) => {
    const { EOB } = req.body;
    const validBooleanValues = [ true, false, ""];
    if (validBooleanValues.includes(EOB)) {
      next();
    } else {
      res.status(400).json({ error: "EOB must be a boolean value" });
    }
  };


  module.exports = {
    checkBoolean,
    checkPatient: (req, res, next) => checkRequiredField(req, res, next, 'patient', 'The name of the patient is required.'),
    // checkDate: (req, res, next) => checkRequiredField(req, res, next, 'date', 'The date of service is required.'),
    checkDescription: (req, res, next) => checkRequiredField(req, res, next, 'cost', 'What was this for? The description is required.'),
  };