require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
// app.use(errorHandler);

// Serve only the static files form the dist directory
app.use(express.static("./www"));


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT ? process.env.PORT : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
