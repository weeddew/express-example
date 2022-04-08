

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(`request : ${ new Date()}`)
    res.send('Hello World!')
})

app.get('/:id', (req, res) => {
    console.log(`request ${req.params.id} : ${ new Date()}`)
    res.send('Hello World!' +  req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


