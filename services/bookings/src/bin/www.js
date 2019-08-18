const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');
require("@babel/polyfill");

const app = express()
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyparser());
app.use(morgan('dev'))
app.get('/api/bookings', (req, res) => res.send('Welcome to legacy program bookings-service'))
// app.use('/api/c', require('../api'))

app.listen(port, () => {
  console.log(`Booking service listening on port ${port}!`)
})
