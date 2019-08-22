const gateway = require('fast-gateway')
const middleware = require('./middlewares');
require('dotenv/config');

gateway({
  routes: [{
    prefix: '/api/customers',
    target: process.env.CUSTOMER_SERVICE_BASE_URL
  }, {
    prefix: '/api/bookings',
    target: process.env.BOOKING_SERVICE_BASE_URL,
    middlewares: [
      middleware.checkJwtToken
    ]
  }]
}).start(process.env.PORT).then(server => {
  console.log(`API Gateway listening on port ${process.env.PORT}!`)
});
