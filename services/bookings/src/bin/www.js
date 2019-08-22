const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const accessTokenJob = require('../cronjobs/').accessTokenJob;
const createAccessToken = require('../cronjobs').createAccessToken;
require('dotenv/config');
require("@babel/polyfill");

const app = express()
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyparser());
app.use(morgan('dev'))
app.use('/', require('../api'))

accessTokenJob.start();

app.listen(port, async () => {
  // await createAccessToken();
  console.log(`Booking service listening on port ${port}!`)
})

export { app };
