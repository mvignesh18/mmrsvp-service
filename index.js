const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())
let players = []

// API to get players list with their availability
app.get('/api/players',(req,res)=>{
    // read the players data from file
    fs.readFile('players.json',(err,data)=>{
        if(err) return res.status(404).send('Unable to find players list')
        players = JSON.parse(data)
        res.send(players)
    })
})

// API to update the players' availability
app.put('/api/players/:id',(req,res)=>{
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
app.put('/api/players/',(req,res)=>{
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


const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`App listening on port ${port}`))