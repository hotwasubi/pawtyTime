// Import needed packages
const mysql = require("mysql");
var conn;

//Set up Heroku database for deployment, if local use local host
//Password removed
if (process.env.JAWSDB_URL){
    conn = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PW,
        database: 'burgers_db'
    });
};

//Try connecting
conn.connect((err)=>{
    if (err) {
        console.log('Error Connection: ' + err.stack);
        return;
}
    console.log("Connected as ID: " + conn.threadId);
});
//export connection
module.exports = conn;
