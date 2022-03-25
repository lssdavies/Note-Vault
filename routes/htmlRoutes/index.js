const path = require("path");
const router = require("express").Router();

// index.html route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

//notes.html route
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

//wildcard route * that returns index,html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

//router needs to be exported for routes to work
module.exports = router;
