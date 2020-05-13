const express = require('express')
const bodyParser = require('body-parser')
const dbconfig = require('./config/database.config')
const mongoose = require('mongoose')


const app = express()

app.use(bodyParser.urlencoded({extended :true}))

app.use(bodyParser.json())
mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url,{
    useNewUrlParser : true
}).then(() => {
    console.log("sucessfull connection")
}).catch(err => {
    console.log("not connect to database ",err)
    process.exit();
})

//define a simple route
app.get('/', (req, res) => {
        res.json({"message": "Welcome to EasyNotes application"});
});

//setting notes routes to express app
require("./app/routes/note.route")(app)

//listen for request
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});