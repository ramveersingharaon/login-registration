const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const homeRouters =require('./routers/homerouters');

const port = process.env.port | 8080;
const app = express();

// db conn 
mongoose.connect('mongodb://localhost:27017/projectfrombabar').then(()=>{
    console.log('The connection is sucesssfully')
}).catch((error)=>
console.log('The connection is fales'))

app.set('view engine','ejs')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',homeRouters)

app.listen(port,()=>{
    console.log(`The server is running port https://${port}`);
})