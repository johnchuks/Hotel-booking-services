import express from 'express'
import Auth from './user';

const router = express.Router();

router.get('/get', Auth.getUser);

module.exports = router;
