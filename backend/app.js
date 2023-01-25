const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;

// handling parse URLECONDED form
// app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root00",
  database: "db_acts",
});

// handles parsing JSON data from frontend
app.use(bodyParser.json());

// cors
app.use(cors());


//insert
app.post("/registers", (req, res) => {
  const { firstname, lastname, email, mobile, status, address, message} = req.body;

  connection.query(

    "INSERT INTO tbl_information(firstname, lastname, email, mobile, status, address, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, mobile, status, address, message],
    (err, results) => {
      try {
        if (results.affectedRows > 0) {
          res.json({ message: "A user has been registered!" });
        } 
        else if (err) {
          res.json({ message: err });
      }else {
          res.json({ message: "Ooops, something went wrong!" });
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
  );
});

//read
app.get("/registers", (req, res) => {
  connection.query("SELECT * FROM tbl_information", (err, results) => {
    try {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.json({ message: "No data found." });
      }
    } catch (err) {
      res.json({ message: err });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
