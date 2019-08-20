import express from 'express'
import Auth from './user';

const router = express.Router();

router.post('/login', Auth.login);
router.patch('/points/:id', Auth.updateBonusPoints);
router.get('/get/:id', Auth.getUser);

module.exports = router;
