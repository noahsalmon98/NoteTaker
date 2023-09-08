const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Middleware
app.use(express.json());
app.use(express.static('public'));

//Get routs

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})
app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname ,'./Develop/public/notes.html'));
})
app.listen(PORT, ()=> {
    console.log(`Express listening to Port : ${PORT}`);
})

//Post route
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    const notesData = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
    notesData.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(notesData));

    res.json(newNote)
});

// delete saved
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const existingNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    const noteIndex = existingNotes.findIndex((note) => note.id === noteId);
  
    if (noteIndex !== -1) {
      existingNotes.splice(noteIndex, 1);
      fs.writeFileSync(
        "./db/db.json",
        JSON.stringify(existingNotes, null, 2),
        "utf8"
      );
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });
  

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});