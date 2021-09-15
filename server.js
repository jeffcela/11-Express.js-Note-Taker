const express = require("express");
const app = express();
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;