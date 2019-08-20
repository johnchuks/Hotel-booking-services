import express from 'express'
import Booking from './reservation';

import middleware from './middlewares';

const router = express.Router();

router.post('/reserve', middleware.checkJwtToken, Booking.createReservation);

module.exports = router;
