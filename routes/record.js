const routes = require('express').Router()
const Recorde = require('../models/record')

//POST adcionar um novo Record 
routes.post('/', (req, res) => {
    if(!req.body.username || !req.body.record){
        return res.status(422).send({error: "faltam dados."})
    }
    const novoRecorde = new Recorde({
        username: req.body.username,
        record: parseFloat(req.body.record)
    })
    novoRecorde.save((err) => {
        if(err) return res.status(403).send({error: err})
        return res.send({record: novoRecorde})
    })
})

//GET pegar um record pelo id
routes.get('/id/:id', (req, res) => {
    if(!req.params.id){
        return res.status(422).send({error: "faltam dados."})
    }
    Recorde.findById(req.params.id).select('_id username record').exec((err, record) => {
        if(err) return res.status(403).send({error: err})
        if(!recorde) return res.status(403).send({error: "Recorde não existe para este id"})
        return res.send({recorde})
    })
})
//get pegar pelo um record pelo token
routes.get('/id/:token', (req, res) => {
    if(!req.params.token){
        return res.status(422).send({error: "faltam dados."})
    }
    Recorde.findOne({
        token: req.params.token
    }).select('_id username record').exec((err, record) => {
        if(err) return res.status(403).send({error: err})
        if(!recorde) return res.status(403).send({error: "Recorde não existe para este token"})
        return res.send({recorde})
    })
})

//PUT atualizar pelo token
routes.put('/',(req, res) => {
    if(!req.body.token || !req.body.record){
        return res.status(422).send({error: "Faltam dados"})
    }
    Recorde.findOne({
        token: req.body.token
    }).exec((err, recorde) => {
        if(err) return res.status(403).send({error: err})
        if(!recorde) return res.status(403).send({error: "Recorde não existe para este token"})
        if(parseFloat(req.body.record) > recorde.recorde){
            recorde.recorde =  parseFloat(req.body. recorde)
        }

        recorde.save((err) => {
            if(err) return res.status(403).send({error: err})
            return res.send({recorde})
        })
    })
})
module.exports = routes