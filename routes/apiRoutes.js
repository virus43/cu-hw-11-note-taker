const fs = require("fs")
const path = require("path");

var noteData;

module.exports = function (app) {

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        noteData = JSON.parse(data);
    })

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });


    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        noteData.push(newNote);
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join('db.json'), parsedata, (err) => {
            if (err) throw err;
        })

        res.json(noteData);
    });


    app.delete("/api/notes/:id", function (req, res) {
        var deleteData = req.params.id;
        for (i = 0; i < noteData.length; i++) {
            if (deleteData === noteData[i].title) {
                noteData.splice(i, 1)
            };
        };
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join('db.json'), parsedata, (err) => {
            if (err) throw err;
        })
        console.log(noteData)
        res.json(noteData)
    })
}