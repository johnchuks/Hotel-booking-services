const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const accessTokenJob = require('../cronjobs/').accessTokenJob;
require('dotenv/config');
require("@babel/polyfill");

const app = express()
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyparser());
app.use(morgan('dev'))
app.get('/vi', (req, res) => res.send('Welcome to legacy program bookings-service'))
app.use('/', require('../api'))


app.listen(port, () => {
  accessTokenJob.start();
  console.log(`Booking service listening on port ${port}!`)
})

export { app };
