import express from 'express'
import Auth from './user';
import middleware from './middleware';

const router = express.Router();

router.post('/login', Auth.login);
router.patch('/points/:id', middleware.checkInternalServiceToken, Auth.updateBonusPoints);
router.get('/get/:id', middleware.checkInternalServiceToken, Auth.getUser);

module.exports = router;
