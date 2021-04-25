const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()
const api_routes = require("./routes/api.js");
const mongoose = require("mongoose");
//const database = require('./functions/database.js');

mongoose.connect(process.env.MLAB_URI);

app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api", api_routes);

app.listen(process.env.PORT || 4000, function() {
    console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
    );
  });