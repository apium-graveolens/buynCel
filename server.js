const express = require('express')
const app = express()

const path = require('path')

const db = require('./db/')

app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/api', require('./api'))

app.use(express.json())

//we don't need lines 15-17 because like 8 already serves index.html on any request.
app.get('/', (req, res, next) => {
    res.sendFile('index.html')
})

db.syncAndSeed()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Now listening in on port ${PORT}`)
})

