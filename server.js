const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'food-options'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/data',(request, response)=>{
    db.collection('nay').find().sort({rating: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


app.post('/addRestaurant', (request, response) => {
    db.collection('nay').insertOne({restaurantName: request.body.restaurantName,
    cuisineType: request.body.cuisineType, rating: request.body.rating, likes: 0})
    .then(result => {
        console.log('Restaurant Added')
        response.redirect('/data')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('nay').updateOne({restaurantName: request.body.restaurantNameS, cuisineType: request.body.cuisineTypeS, rating: request.body.ratingS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteRestaurant', (request, response) => {
    db.collection('nay').deleteOne({restaurantName: request.body.restaurantNameS, cuisineType: request.body.cuisineTypeS, rating: request.body.ratingS, likes: request.body.likesS})
    .then(result => {
        console.log('Restaurant Deleted')
        response.json('Restaurant Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})