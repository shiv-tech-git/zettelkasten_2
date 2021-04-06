const mysqlHandler = require('./databaseHandler.js')

module.exports = {
  fetchNotes,
  createNote,
  createTag,
  fetchAllTags,
  fetchAllTitles,
  fetchNoteById,
  deleteNoteById,
  editNoteById,
}


function fetchNotes() {
  return mysqlHandler.fetchNotes()  
}

function createNote( note ) {
  return mysqlHandler.createNote( note )  
}

function createTag( tag ) {
  return mysqlHandler.createTag( tag )  
}

function fetchAllTags() {
  return mysqlHandler.fetchAllTags()  
}

function fetchAllTitles() {
  return mysqlHandler.fetchAllTitles()  
}

function fetchNoteById(id) {
  return mysqlHandler.fetchNoteById(id)  
}

function deleteNoteById(id) {
  return mysqlHandler.deleteNoteById(id)  
}

function editNoteById(note) {
  return mysqlHandler.editNoteById(note)  
}
