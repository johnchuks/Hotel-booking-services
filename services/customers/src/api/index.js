import express from 'express'
import Auth from './user';

const router = express.Router();

router.get('/get', Auth.getUser);
router.post('/create', Auth.register);

module.exports = router;
