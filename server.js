const express = require('express')
const app = express()

const path = require('path')

const db = require('./db/')

app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/api', require('./api'))

db.syncSeed()

try {
    Object.assign(process.env, require('./.env.js'))
  } catch (ex) {
    console.log(ex)
  }

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Now listening in on port ${PORT}`)
})

app.use( (err, req, res, next) => {
    console.log("Express is handling error: ", err)
    res.status(err.status || 500).send({ error: err.message })
})
