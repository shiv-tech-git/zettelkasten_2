const mysql = require('mysql');

mysql_config = {
  host     : 'localhost',
  user     : 'zettelkasten',
  password : 'zettelkasten',
  database : 'zettelkasten',
}

class DbHandler {

  static establish_connection() {
    DbHandler.connection = mysql.createConnection(mysql_config);
    DbHandler.connection.connect()
    console.log('connecting to database...')
  }

  static dbQuery(query) {
    return new Promise((resolve ,reject) => {
      DbHandler.connection.query(query, function(error, results, fields) {
          if (error) {
            console.log(error);
          }
          resolve(results)
      })
    })
  }

  static fetchNotes() {
    return DbHandler.dbQuery('SELECT * FROM notes')
  }

  static createNote( note ) {
    console.log("create note", note)
      let timestamp = Math.floor(Date.now()/1000);
      return DbHandler.dbQuery(`insert into notes(title, body, tags, links, creating_timestamp, updating_timestamp) 
      values('${note.title}', '${note.body}', '${note.tags}', '${note.links}', '${timestamp}', '${timestamp}')`)
  }

  static createTag(tag) {
    return DbHandler.dbQuery(`insert into tags(tag) values('${tag.tag}')`)
  }

  static fetchAllTags() {
    return DbHandler.dbQuery('SELECT id, tag FROM tags')
  }

  static fetchAllTitles() {
    return DbHandler.dbQuery('SELECT id, title FROM notes')
  }

  static fetchNoteById(id) {
    return DbHandler.dbQuery(`SELECT * FROM notes WHERE id = ${id.id}`)
  }

  static deleteNoteById(id) {
    return DbHandler.dbQuery(`DELETE FROM notes WHERE id = ${id.id}`)
  }

  static editNoteById(note) {
    let timestamp = Math.floor(Date.now()/1000);
    return DbHandler.dbQuery(`UPDATE notes SET title='${note.title}', body='${note.body}', tags='${note.tags}', links='${note.links}', updating_timestamp='${timestamp}' WHERE id=${note.id}`)
  }

}

module.exports = DbHandler;