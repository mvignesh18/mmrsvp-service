const express = require('express')
const app = express()
const players = require('./routes/players')

app.use(express.json())
app.use('/api/players',players)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`App listening on port ${port}`))