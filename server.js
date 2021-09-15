const express = require("express");
const app = express();
const db = require("./Public/db/db.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Public"));

let noteId = db.map((note) => note.id);

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Public/index.html"));
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

app.delete("/api/notes/:id", (req, res) => {
  let newDb = [];
  for (let index = 0; index < db.length; index++) {
    if (db[index].id != req.params.id) {
      newDb.push(db[index]);
    }
  }
  db = newDb;
  fs.writeFile("./db/db.json", JSON.stringify(db), "utf8", (err, data) => {
    if (err) throw err;
  });
});

app.post("/api/clear", function (req, res) {
  notes.length = 0;
  res.json({ ok: true });
});

app.listen(PORT, function () {
  console.log("App listening to " + PORT);
});