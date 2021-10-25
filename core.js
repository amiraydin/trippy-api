```json
// package.json
{
  "name": "trippy_api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest --watch",
    "dev": "nodemon index.js",
    "start": "node index.js",
    "deploy": "git push heroku master"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "express-handlebars": "^5.3.2",
    "jsonwebtoken": "^8.5.1"
  },
  "devDependencies": {
    "jest": "^27.0.6"
  }
}
```
    ```jsx
// index.js
const express= require('express')
const app =express()
const port =process.env.PORT ??8000
app.listen(port)
app.use(express.json())
const hbs = require('express-handlebars')
app.engine('handlebars',hbs())
app.set('view engine','handlebars')
app.use(express.urlencoded({ extended: true }))

constjwt= require('jsonwebtoken')
const JWT_SECRET = 'clé_pour_encrypter_notre_token' // peu importe sa valeur

const hotels = ['Hilton','Ritz','Trianon Palace']

app.get('/hotels',(req,res) => {
  res.json(hotels)
})

app.get('/hotels/:id',(req,res) => {
  const index = req.params.id
  res.json(hotels[index])
})

app.post('/hotels',(req,res) => {
  const hotel = req.body.name
  hotels.push(hotel)
  res.json({ success: true })
})

app.put('/hotels/:id',(req,res) => {
  const name = req.query.name
  const index = req.params.id
  hotels[index] = name
  res.json({ success: true })
})

app.get('/login',(req,res) => {
  res.render('login')
})

app.get('/auth/login',(req,res) => {
  const token =jwt.sign({ username: req.body.username },JWT_SECRET)
  res.json(token)
})

const deleteHotel = require('./deleteHotel')
app.delete('/hotels/:id',(req,res) => {
  deleteHotel(hotels,req.params.id)
  res.json({ success: true })
})
```
    ```jsx
// deleteHotel.js
const deleteHotel = (hotels, index) => {
  hotels.splice(index, 1)
  return hotels
}

module.exports = deleteHotel
```
// deleteHotel.test.js
// const deleteHotel = require('./deleteHotel')

// test('delete an hotel in list', () => {
//   const hotels = ['a', 'b', 'c']
//   const updatedHotels = ['a', 'c']
//   const result = deleteHotel(hotels, 1)
//   expect(result).toEqual(updatedHotels)
//   expect(deleteHotel(hotels, 5)).toBe(hotels)
// })


