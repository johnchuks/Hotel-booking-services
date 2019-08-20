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
app.get('/api', (req, res) => res.send('Weclome to legacy program customers-service'))
app.use('/', require('../api'))

app.listen(port, () => {
  console.log(`Customers service listening on port ${port}!`)
})
