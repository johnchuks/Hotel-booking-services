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
app.get('/', (req, res) => res.send('Weclome to JLBooking-customers-service'))
app.use('/api/customers', require('../api'))

app.listen(port, () => {
  console.log(`JLBooking customers service listening on port ${port}!`)
})
