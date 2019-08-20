const gateway = require('fast-gateway')
const middleware = require('./middlewares');
require('dotenv/config');

gateway({
  routes: [{
    prefix: '/api/customers',
    target: 'http://host.docker.internal:5000'
  }, {
    prefix: '/api/bookings',
    target: 'http://host.docker.internal:3000',
    middlewares: [
      middleware.checkJwtToken
    ]
  }]
}).start(process.env.PORT).then(server => {
  console.log(`API Gateway listening on port ${process.env.PORT}!`)
});
