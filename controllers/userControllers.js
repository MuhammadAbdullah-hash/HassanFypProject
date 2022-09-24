const express = require('express');
const UserController = express.Router()
const pool = require('../dataBase/dbConnector');


// middleware that is specific to this router
UserController.use((req, res, next) => {
    next()  })




// define the User Routes 
UserController.post('/login', async (req, res) => {
    // req --> It is the request Object In which we will get data from user that will hit this api
    // res --> It is the responce Object that this api will send to the user 

    const data = JSON.parse(req.body);
    console.log("-->" , data)

    pool.getConnection(function(err, connection) {
        if(err){
            connection.release();
            res.send(err) }
        else{
            connection.release();
            res.send("Connected Successfully") }

    })
})



UserController.get('/signIn', async (req, res) => {
    // Sending Html File as well as Some Variables 
    // that can be accessed within the html file using ${varname} Notation
    res.render("signInPage.html" , {locals: {title: 'Data From Api !'}} )
})



  

module.exports = UserController;