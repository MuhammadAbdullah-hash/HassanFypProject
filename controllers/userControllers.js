const express = require('express');
const UserController = express.Router()
var jwt = require('jsonwebtoken');
const pool = require('../dataBase/dbConnector');


const PRIVATEKEY = "HASSAN-123"

// middleware that is specific to this router
UserController.use((req, res, next) => { next()  })
// define the User Routes 





UserController.get('/signIn', async (req, res) => {
    // Sending Html File as well as Some Variables 
    // that can be accessed within the html file using ${varname} Notation
    res.render("signInPage.html" , {locals: {title: 'This is Backend Api Talking !'}} )
})



UserController.post('/login', async (req, res) => {
    // req --> It is the request Object In which we will get data from user that will hit this api
    // res --> It is the responce Object that this api will send to the user 
    const data = req.body;
    if( data.user &&  data.password){
        const dataInsert = [data.user , data.password]
        pool.getConnection(function(err, connection) {
            if(err){
                connection.release();
                res.send(err) }
            else{
                connection.query( "SELECT * FROM users WHERE username=? AND password=?", dataInsert , function(err2 , result2){
                    if(err2){
                        connection.release();
                        res.send({"status" : false} ) }
                    else{
                        connection.release();
                        if(result2.length > 0 ){ 
                            let token = jwt.sign({ username : data.user , role : result2[0].role }, PRIVATEKEY);
                            res.send({ "token"  : token , "role" : result2[0].role ,  "status" : true}) }
                        else{ res.send({ "status" : false }) }
                         }
                })    
            }})
    }
    else{
        res.send({"status" : false}) }

})






UserController.post('/add', async (req, res) => {
    // req --> It is the request Object In which we will get data from user that will hit this api
    // res --> It is the responce Object that this api will send to the user 
    const data = req.body;
    if( data.user &&  data.password && data.role){
        const dataInsert = [data.user , data.password , data.role]
        pool.getConnection(function(err, connection) {
            if(err){
                connection.release();
                res.send(err) }
            else{
                connection.query( "INSERT INTO users (username, password, role) VALUES (?,?,?)", dataInsert , function(err2 , result2){
                    if(err2){
                        connection.release();
                        res.send("User Not added successfully") }
                    else{
                        connection.release();
                        res.send("User Added Successfully") }
                })    
            }})
    }
    else{
        res.send("Plz Provide Username and Password") }

})

  

module.exports = UserController;