const express = require('express')
const ejs = require('ejs')
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 4444;
require('dotenv').config()

let db,
    DB_URI = process.env.DB_STRING

MongoClient.connect(DB_URI, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to database');
        //create or specify a database
        db = client.db('wushu-wisdom') 
    })
    .catch (err => console.log(err))

//set EJS templating
app.set('view engine', 'ejs')
// make static files in the public folder visible to express
app.use(express.static('public'))
// Extracts urlencoded data and adds to body property of request object (req.body)
app.use(express.urlencoded({ 'extended': true}))
// Parser for json objects, adds to request.body
app.use(express.json())

    // READ operation / GET request for root file - retrieve available quotes
app.get('/', (req, res) => {
    // READ operation - retrieve quotes from DB  // find() retrieves, toArray() organizes 
    db.collection('quotes').find().toArray()
    .then(results => {
        // res.render(view, locals) or file, data
        console.log('rendering quotes from "quotes" collection');
        let randIndex = Math.floor(Math.random() * (results.length - 1))
        res.render('index.ejs', { quotes: results, randomIndex: randIndex })
    })
    .catch(err => console.log(err))
})
    
    //CREATE operation / POST request for quotes
    app.post('/quotes', (req, res) => {
        //insert quotes into database quote collection
        db.collection('quotes').insertOne({name: req.body.name, quote: req.body.quote, likes: 0})
        .then(result => {
            // browser expecting response. Redirect browser to root
            res.redirect('/')
        })
        .catch(err => console.log(err))
    })

    app.put('/addOneLike', (req, res) => {
        db.collection('quotes').updateOne({name: req.body.name, quote: req.body.quote, likes: req.body.likes}, {
            $set: {
                likes: req.body.likes + 1                
            }
        },{
            sort: {_id: -1},
            upsert: false
        })
        .then(result => {
            console.log('Added one like')
            res.json('Like added')
        }) 
        .catch( err => console.error(err))
    })

    app.delete('/deleteQuote', (req, res) => {
        db.collection('quotes').deleteOne({name: req.body.name, quote: req.body.quote, likes: req.body.likes})
        .then( result => {
            console.log('Quote deleted');
            res.json('Quote deleted')
        })
        .catch(err => console.error(err))
    })
    

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})



