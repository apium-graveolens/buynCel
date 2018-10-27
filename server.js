const express = require('express')
const app = express()

const path = require('path')

const db = require('./db/')

app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/api', require('./api'))

app.use(express.json())

db.syncAndSeed()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Now listening in on port ${PORT}`)
})

