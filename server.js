const express = require("express");
const app = express();
const db = require(".develop/db/db.json");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

let noteId = db.map((note) => note.id);

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.post("/api/notes", function (req, res) {
  let newId = 0;
  while (noteId.includes(newId)) {
    newId++;
  }
  noteId.push(newId);
  const nextNote = {
    id: newId,
    title: req.body.title,
    text: req.body.text,
  };
  db.push(nextNote);
  fs.WriteFile(
    "./db/db.json",
    JSON.stringify(db),
    "utf8",
    (err, data) => {
      if (err) throw err;
    }
  );
});