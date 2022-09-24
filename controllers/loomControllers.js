const express = require('express')
const looomController = express.Router()


// middleware that is specific to this router
looomController.use((req, res, next) => {
    next();
})


// define the home page route
looomController.get('/', (req, res) => {
    res.send('Looms Apis')
})

  

module.exports = looomController;