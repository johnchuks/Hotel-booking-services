import express from 'express'
import Auth from './user';

const router = express.Router();

router.post('/create', Auth.create);

module.exports = router;
