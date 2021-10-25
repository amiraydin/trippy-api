const express = require('express');
const app = express();
const rout = require('./routes/hotel');
const hbs = require('express-handlebars');
const path = require('path');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'clé_pour_chiffrer_notre_token' // peu importe sa valeur
// const token = jwt.sign({ username: req.body.username }, JWT_SECRET);

const hotels = ["Hilton", "Ritz", "Trianon Palace"];
// console.log(hotels[1]);

app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/hotels', (req, res) => {
    res.send(hotels)
})

app.use('/', rout)

app.get('/hotels/:id', (req, res) => {
    let id = req.params.id;
    res.json(hotels[id])
})

app.post('/hotels', (req, res) => {
    const hotel = req.body.email //ca sert a notre name dans form
    hotels.push(hotel)
    res.json({ message: 'on vous a ajouter' })
})

app.put('/hotels/:id', (req, res) => {
    const name = req.query.name;
    const id = req.params.id;
    hotels[id] = name
    res.json({ success: true })
})


console.log(`hotels`, hotels)




app.listen(3030, () => {
    console.log('on vous ecoute sur le port :' + 3030);
})