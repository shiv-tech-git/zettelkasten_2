const mysql = require('mysql');

class DbHandler {
  
  // static mysql_config = {
  //   host     : 'localhost',
  //   user     : 'zettelkasten',
  //   password : 'zettelkasten',
  //   database : 'zettelkasten',
  // }


  static establish_connection() {
    DbHandler.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'zettelkasten',
      password : 'zettelkasten',
      database : 'zettelkasten',
    });
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
    
    // let d = new Date("2015-03-25 08:00:00");
    // let timestamp = d.getTime() / 1000;

    let timestamp = Date.now();

    console.log("save to database: " + note)
    console.log(`insert into notes(title, body, tags, links) values('${note.title}', '${note.note}', '${note.tags}', '${note.links}')`)
    DbHandler.dbQuery(`insert into notes(title, body, tags, links, creation_date) 
    values('${note.title}', '${note.note}', '${note.tags}', '${note.links}', FROM_UNIXTIME('${timestamp}'))`)
  }

  // static dbQuery( query ) {
  //   return new Promise((resolve ,reject) => {
  //     const connection = mysql.createConnection({
  //       host     : 'localhost',
  //       user     : 'zettelkasten',
  //       password : 'zettelkasten',
  //       database : 'zettelkasten'
  //     });
      
  //     connection.connect()
      
  //     connection.query(query, function (error, results, fields) {
  //       if (error) console.log(error);
  //       resolve(results)
  //       // console.log('Result: ', results);
  //       connection.end()
  //     });
  //   })
  // }

}

module.exports = DbHandler;