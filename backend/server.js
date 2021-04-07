const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');
const fetchAllNotes = require('./js/requestHandlers.js').fetchNotes
const createNote = require('./js/requestHandlers.js').createNote
const createTag = require('./js/requestHandlers.js').createTag
const fetchAllTags = require('./js/requestHandlers.js').fetchAllTags
const fetchAllTitles = require('./js/requestHandlers.js').fetchAllTitles
const fetchNoteById = require('./js/requestHandlers.js').fetchNoteById
const deleteNoteById = require('./js/requestHandlers.js').deleteNoteById
const editNoteById = require('./js/requestHandlers.js').editNoteById

const DbConnection = require('./js/databaseHandler.js')



const app = express();



// ===============USE================
app.use(bodyParser.json());
app.use("/src", express.static(path.resolve(__dirname, "../frontend/src")));
app.use("/", express.static(path.resolve(__dirname, "../frontend/public")));
app.use(express.urlencoded())
// ===============USE================



// ============REQUESTS================
//POST
app.post('/create_note', (req, res) => {
  createNote(req.body).then(() => {
    res.json({mesage: 'success'})
  })
})
app.post('/create_tag', (req, res) => {
  createTag(req.body).then(() => {
    res.json({mesage: 'success'})
  })
})
app.post("/fetch-note-by-id", (req, res) => {
  fetchNoteById(req.body).then(data => {
    res.json(data);
  })
})
app.post("/delete-note-by-id", (req, res) => {
  deleteNoteById(req.body).then(data => {
    res.json({mesage: 'success'});
  })
})
app.post("/edit-note-by-id", (req, res) => {
  editNoteById(req.body).then(data => {
    res.json({mesage: 'success'});
  })
})

//GET
app.get("/fetch-all-notes", (req, res) => {
  fetchAllNotes().then(data => {
    res.json(data);
  })
})
// app.get("/fetch-all-heads", (req, res) => {
//   fetchHeads().then(data => {
//     res.json(data);
//   })
// })
app.get("/fetch-all-titles", (req, res) => {
  fetchAllTitles().then(data => {
    res.json(data);
  })
})
app.get("/fetch-all-tags", (req, res) => {
  fetchAllTags().then(data => {
    res.json(data);
  })
})

// app.get("/view-note/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"))
// })
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"))
})


// ============REQUESTS================



app.listen(3000, () => {
  console.log("Server running...");
  DbConnection.establish_connection();
})