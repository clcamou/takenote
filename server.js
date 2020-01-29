//dependencies 
const fs = require("fs");
const express = require("express");

//html route 
const path = require("path");

let app = express();

//set port
let PORT = process.env.PORT || 8181; 



//set server to use express 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//use public 
app.use(express.static("public"));

//use file system to write to the database
app.get("/api/notes", function(req, res){
    let dbParsed;
    fs.readFile("./db/db.JSON", function(err, data){
        if (err) {
            console.log(err)
        } else {
            return res.json(JSON.parse(data))
        }
    })
});

//Send data to the database 
app.post("/api/notes", function(res, req){
    let newNote = req.body 
    console.log(newNote)
    let dataTable;

    fs.readFile("./db/db.JSON", function(err, data){
        if (err) {
            console.log(err)
        } else {
            dataTable = JSON.parse(data)
            dataTable.push(newNote)
            console.log("Success!")
        }
    })
})

//GET data from database 

app.get ("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/notes", function(req, res){ 
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

//delete from database 
app.delete("/api/notes/:id", function(req, res){

});


app.listen(PORT, function () {
    console.log("You did it!" + PORT)
})