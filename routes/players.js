const express = require('express')
const fs = require('fs')
const router = express.Router()

let players = []
// API to get players list with their availability
router.get('/',(req,res)=>{
    // read the players data from file
    fs.readFile('players.json',(err,data)=>{
        if(err) return res.status(404).send('Unable to find players list')
        players = JSON.parse(data)
        res.send(players)
    })
})

// API to update the players' availability
router.put('/:id',(req,res)=>{
    fs.readFile('players.json',(err,data)=>{
        if(err) return res.status(404).send('Unable to find players list')
        players = JSON.parse(data)

        let player = players.find(p => p.id == req.params.id)
        if(!player) return res.status(404).send('Player not found')
        const index = players.indexOf(player)
        players[index].availability = req.body.availability

        fs.writeFile('players.json',JSON.stringify(players,null, 2),(err,data)=>{
            if(err) return res.status(400).send('Error updating player availability')
            res.send(players)
        })
    })    
})

// API to reset player availability
router.put('/',(req,res)=>{
    fs.readFile('players.json',(err,data)=>{
        if(err) return res.status(404).send('Unable to find players list')
        players = JSON.parse(data)

        if(players){
            players.forEach(element => {
                element.availability = 0
            });
        }

        fs.writeFile('players.json',JSON.stringify(players,null, 2),(err,data)=>{
            if(err) return res.status(400).send('Error updating player availability')
            res.send(players)
        })
    }) 
})

module.exports = router