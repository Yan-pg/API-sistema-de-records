const express = require('express')
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const mongoose = require("mongoose")
const Recorde = require("./models/record")
const RecordRoutes = require("./routes/record")

mongoose.connect('mongodb://localhost:27017/gerenciador').then(() => {
    console.log("mongoose conectado")
}).catch((err) => {
    console.log("Ocorreu um erro ao conectar com o mongoose "+err)
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extender: false}))
app.use(bodyParser.json())


app.use('/record', RecordRoutes)
app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(3000, function() {
    console.log("Servidor rodando")
})