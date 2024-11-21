const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./qoute.db", sqlite.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err);
});

const sql = 'CREATE TABLE quote (ID INTEGER PRIMARY KEY, movie STRING, quote STRING, character STRING)';
db.run(sql);
