const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect')
const { saveAddress, getUserAddresses } = require('../controllers/address.controller')

router.post('/add',protect,saveAddress );
router.get('/get',protect,getUserAddresses )

module.exports = router