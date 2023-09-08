const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Middleware
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname ,'/public/notes.html'));
})
app.listen(PORT, ()=> {
    console.log(`Express listening to Port : ${PORT}`);
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    const notesData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    notesData.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(notesData));

    res.json(newNote)
});