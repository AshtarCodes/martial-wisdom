const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express();
const MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000

// connect to mongoDB Atlas
const connectionString = 'mongodb+srv://Ash:PXRoKUkjhSTHvaVhs@cluster0.ej8ku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database');

    //create a database
    const db = client.db('wushu-wisdom')

    //create a collection within the database
    const quotesCollection = db.collection('quotes')

    //set EJS templating
    app.set('view engine', 'ejs')

    // Extracts data and adds to body property of request object (req.body)
    app.use(bodyParser.urlencoded({ 'extended': true}))
    
    // READ operation / GET request for root file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'index.html'))
        
        // READ operation - retrieve quotes from DB  // find() retrieves, toArray() organizes 
        db.collection('quotes').find().toArray()
        .then(results => {
            // res.render(view, locals) or file, data
            res.render('index.ejs', { quotes: results })
        })
        .catch(err => console.log(err))
    })
    
    //CREATE operation / POST request for quotes
    app.post('/quotes', (req, res) => {
        //insert quotes into database quote collection
        quotesCollection.insertOne(req.body)
        .then(result => {
            // browser expecting response. Redirect browser to root
            res.redirect('/')
        })
        .catch (err => console.log(err))
    })
    

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch (err => console.log(err))

