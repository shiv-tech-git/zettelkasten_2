const mysql = require('mysql');

class DbHandler {

  static dbQuery( query ) {
    return new Promise((resolve ,reject) => {
      const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'zkuser',
        password : 'zkpass',
        database : 'zettelkasten'
      });
      
      connection.connect()
      
      connection.query(query, function (error, results, fields) {
        if (error) console.log(error);
        resolve(results)
        // console.log('Result: ', results);
        connection.end()
      });
    })
    
    
  }

  static fetchNotes() {
    return DbHandler.dbQuery('SELECT * FROM notes');
  }

  static createNote( note ) {
    // let d = new Date("2015-03-25 08:00:00");
    // let timestamp = d.getTime() / 1000;

    let timestamp = Date.now();

    console.log(note)
    console.log(`insert into notes(title, body, tags, links) values('${note.title}', '${note.note}', '${note.tags}', '${note.links}')`)
    DbHandler.dbQuery(`insert into notes(title, body, tags, links, creation_timestamp) 
    values('${note.title}', '${note.note}', '${note.tags}', '${note.links}', FROM_UNIXTIME('${timestamp}'))`)
  }

}

module.exports = DbHandler;