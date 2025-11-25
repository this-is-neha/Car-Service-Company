const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const mainRoute = require("./routing.config");
const path = require('path');
const app = express();
require("./db.config");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(express.json());

app.use(mainRoute);
console.log("Express server is running");
module.exports = app;
