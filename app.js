const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//mySql

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_beers",
});

//get all beers
app.get("/beers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    //query(string ,callback)

    connection.query("SELECT * from beers", (err, rows) => {
      connection.release(); //return the connection pool

      // Handle error after the release.
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//delete a record /beer
app.delete("/beers/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    //query(string ,callback)

    connection.query('DELETE  from beers WHERE id = ?',[req.params.id], (err, rows) => {
      connection.release(); //return the connection pool

      // Handle error after the release.
      if (!err) {
        res.send(`Beers wiuth the record ID: ${[req.params.id]} has been removed`);
      } else {
        console.log(err);
      }
    });
  });
});

//get beer by id
app.get("/beers/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    //query(string ,callback)

    connection.query("SELECT * from beers WHERE id = ?",[req.params.id] ,(err, rows) => {
      connection.release(); //return the connection pool

      // Handle error after the release.
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//add a record 
app.post("/beers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const params = req.body

    //query(string ,callback)

    connection.query("INSERT INTO beers SET ?", params ,(err, rows) => {
      connection.release(); //return the connection pool

      // Handle error after the release.
      if (!err) {
        res.send(`Beer with name ${params.name} has been added`);
      } else {
        console.log(err);
      }
    });
  });
});

//update a beer
app.put("/beers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    
   const {id, name ,tagline ,description ,image}= req.body
    //query(string ,callback)

    connection.query("UPDATE beers SET name = ? WHERE id = ?", [name ,id] ,(err, rows) => {
      connection.release(); //return the connection pool

      // Handle error after the release.
      if (!err) {
        res.send(`Beer with name ${name} has been added`);
      } else {
        console.log(err);
      }
    });
  });
});

//listen on environment or on port 5000
app.listen(port, () => console.log(`listen on port ${port}`));
