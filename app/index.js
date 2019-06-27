const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const routes = require('./routes')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:AdminPass@cluster0-cdcxg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})
app.get('/', (req, res) => {
    console.log('/')
    res.send('Hello')
})
app.use('/', routes)

module.exports = server