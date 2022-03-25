const router = require("express").Router();
const fs = require("fs");
//id generating npm package // uniqid()add id to enty
const uniqid = require("uniqid");

//gets all notes using fs.readFile to read data from db.json, then using JSON.parse() to convert data to array object
router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//post route to add notes
router.post("/notes", (req, res) => {
  // accessing the file as before
  fs.readFile("./db/db.json", (err, data) => {
    //converting to object
    const notes = JSON.parse(data);
    //capturing body, adding id using uniqid and storing as a new note
    const newNote = { id: uniqid(), ...req.body };
    //adding newNote to existing note array and then writing db.json
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
      if (err) throw err;
      res.json(req.body);
    });
  });
});

// //delete route Bonus!!!
router.delete("/notes/:id", (req, res) => {
  // accessing the file as before
  fs.readFile("./db/db.json", (err, data) => {
    const notes = JSON.parse(data);
    console.log(notes);

    //taking in the id of the note to be deleted
    let deleteId = req.params.id;
    console.log(deleteId);
    console.log(notes.length);

    for (let i = 0; i < notes.length; i++) {
      if (deleteId === notes[i].id) {
        // use splice to remove file, and not leave undefinied 'holes'
        notes.splice([i], 1);

        //write note to db.json file
        fs.writeFileSync("db/db.json", JSON.stringify(notes));

        res.json(notes);
      }
    }
  });
})

module.exports = router;
