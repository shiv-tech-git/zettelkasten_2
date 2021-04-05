const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');
const fetchNotes = require('./requestHandlers.js').fetchNotes
const createNote = require('./requestHandlers.js').createNote

const app = express();

app.use(bodyParser.json());
app.use("/src", express.static(path.resolve(__dirname, "../frontend/src")));
app.use("/", express.static(path.resolve(__dirname, "../frontend/public")));

app.use(express.urlencoded())
app.post('/submit-form', (req, res) => {
  const username = req.body.username
  console.log(req.body)
})

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"))
})
app.get("/all", (req, res) => {
  res.send(fetchNotes())
})

app.post('/create', function (req, res) {
    console.log(req.body)
    // createNote(req.body);
    // fetchNotes().then(data => { 
    //   // console.log(data)
    //   console.log("sending data back")
    //   // console.log(data)
    //   console.log(data)
    //   res.json(data);
    // })
    
  })

app.listen(3000, () => console.log("Server running..."))