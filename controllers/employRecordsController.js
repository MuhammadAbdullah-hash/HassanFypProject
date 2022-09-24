const express = require('express')
const employRecordsController = express.Router()


// middleware that is specific to this router
employRecordsController.use((req, res, next) => {
    next();
})


// define the home page route
employRecordsController.get('/', (req, res) => {
    res.send('Epmloy Records Apis')
})

  

module.exports = employRecordsController;