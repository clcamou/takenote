//dependencies 
const fs = require("fs")
const express = require("express")
const path = require("path")

let app = express();

//set port
let PORT = process.env.PORT || 3000; 

//use file system to write to the database
fs.writeFile(path.join(__dirname, "db/db.json"), "[]",  function (err) {
    if (err) {
        return console.log(err);
    } 
    console.log("Success")
})

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//GET data from database 
app.get("/notes", function(req, res){
    res.sendfile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } 
        data = JSON.parse(data)
        res.send(data);
        })
});

app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }; 
        data = JSON.parse(data)
        data.push(req.body)
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(data), function (err){
            if (err) {
                return console.log(err);
            }
             res.send(data);
            })
        })
});
    
app.delete("/api/notes/:note", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } 
        let remove = req.param.note;
        data = JSON.parse(data)
        let result = data.filter( function(data){
            data.title !== remove;
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(result), function(err){
                if (err) {
                    return console.log(err);
                }
            }) 
            res.send(data);
        });
    });
})

app.listen(PORT, function () {
    console.log("You did it!" + PORT)
})