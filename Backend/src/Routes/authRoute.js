const express = require('express');
const router = express.Router();
const Authcontrollers = require('../controllers/auth')

router.post('/signup',Authcontrollers.Signup)
router.post('/login',Authcontrollers.Login)

module.exports = router