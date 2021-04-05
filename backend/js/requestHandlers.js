const mysqlHandler = require('./databaseHandler.js')

module.exports = {
  fetchNotes,
  createNote
}


function fetchNotes() {
  return mysqlHandler.fetchNotes()  
}

function createNote( note ) {
  mysqlHandler.createNote( note )  
}