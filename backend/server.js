const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');
const fetchNotes = require('./js/requestHandlers.js').fetchNotes
const createNote = require('./js/requestHandlers.js').createNote
const DbConnection = require('./js/databaseHandler.js')



const app = express();



// ===============USE================
app.use(bodyParser.json());
app.use("/src", express.static(path.resolve(__dirname, "../frontend/src")));
app.use("/", express.static(path.resolve(__dirname, "../frontend/public")));
app.use(express.urlencoded())
// ===============USE================



// ============REQUESTS================
app.post('/create', (req, res) => {
  createNote(req.body)
})
app.get("/all", (req, res) => {
  fetchNotes().then(data => {
    console.log(data)
    res.json(data);
  })
})
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"))
})
app.post('/create', function (req, res) {
    console.log(req.body)
    createNote(req.body);
  })
// ============REQUESTS================



app.listen(3000, () => {
  console.log("Server running...")
  DbConnection.establish_connection();
})