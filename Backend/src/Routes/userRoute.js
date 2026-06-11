const express = require('express');
const router = express.Router();

 
const { getUserprofile, getAllUsers } = require('../controllers/usercontroller');

const protect = require('../middleware/protect'); 
 
router.get('/profile', protect, getUserprofile);
router.get('/', protect, getAllUsers);

 
module.exports = router;