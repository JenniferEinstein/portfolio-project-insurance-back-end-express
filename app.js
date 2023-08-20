// DEPENDENCIES
const express = require("express");
console.log(express);
const cors = require("cors");

// CONFIGURATION
const app = express()


// === MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.get('/', function (req, res) {
  res.send('This is the backend of my full stack portfolio project')
})


// (implement the index route that uses pg-promise to query your db)
const entryController = require("./controllers/entryController.js");
app.use("/entries", entryController);


// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("There is a problem. This page was not found");
});

// === EXPORT ===
module.exports = app;