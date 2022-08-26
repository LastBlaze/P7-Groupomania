const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', auth, userCtrl.getUserProfile);
router.get('/logout', auth, userCtrl.logout);

module.exports = router;