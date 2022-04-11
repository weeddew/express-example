var dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const port = 3000

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
    dbName: 'sample_analytics'
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Define a schema
var Schema = mongoose.Schema;

var CustomersSchema = new Schema({
    username: String,
    birthdate: Date
});

var Customers = mongoose.model('Customers', CustomersSchema );


// sample_analytics.customers


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
        new transports.File({ filename: './logs/server.log' }),
    ],
});

app.get('/', (req, res) => {
    Customers.find({ 'username': { $regex: '.*' + 'er' + '.*' } }, 'username name address', function (err, customers) {
        if (err) {
            console.log(`not found`)
        };

        console.log(customers)
    })


    console.log(`request : ${ new Date()}`)
    logger.info(`request : /`);
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


