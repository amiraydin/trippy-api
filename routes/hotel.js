const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login', { login: 'Welcome here' })
})

module.exports = router;