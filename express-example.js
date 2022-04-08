
const express = require('express')
const app = express()
const port = 3000

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: 'server.log' }),
    ],
});

app.get('/', (req, res) => {
    console.log(`request : ${ new Date()}`)
    logger.info(`request : /}`);
    res.send('Hello World!')
})

app.get('/:id', (req, res) => {
    console.log(`request ${req.params.id} : ${ new Date()}`)
    logger.info(`request /${req.params.id} `);
    res.send('Hello World!' +  req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


