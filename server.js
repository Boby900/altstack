const express = require('express')
const app = express()
const mongoose = require("mongoose");
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
const bodyParser = require('body-parser')
const connectDB = require("./config/database");


require("dotenv").config();
DB_STRING = process.env.DB_STRING

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))



//Connect To Database

mongoose.connect(DB_STRING, {

    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.get('/questions', (req, res) => {
    console.log(res.json(questions));
});

// API endpoint to get a specific question by its ID
app.get('/questions/:id', (req, res) => {
    const questionId = parseInt(req.params.id);
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        res.status(404).json({ error: 'Question not found' });
    } else {
        res.json(question);
    }
});





app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', function (req, res) {
    res.redirect('/')
    // res.sendFile(__dirname + '/bob.html')
})
app.post('/quotes', (req, res) => {
    const newQuote = new Quote(req.body);
    newQuote.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error));
});



app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
});