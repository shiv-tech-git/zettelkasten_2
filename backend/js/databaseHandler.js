const mysql = require('mysql');

// mysql_config = {
//   host     : 'localhost',
//   user     : 'zettelkasten',
//   password : 'zettelkasten',
//   database : 'zettelkasten',
// }

mysql_config = {
  host     : 'localhost',
  user     : 'zkuser',
  password : 'zkpass',
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
      let timestamp = Date.now();
      return DbHandler.dbQuery(`insert into notes(title, body, tags, links, creation_timestamp) 
      values('${note.title}', '${note.body}', '${note.tags}', '${note.links}', FROM_UNIXTIME('${timestamp}'))`)
  }

}

module.exports = DbHandler;