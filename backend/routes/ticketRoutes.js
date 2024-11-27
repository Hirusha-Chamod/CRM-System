const express = require('express');
const { createTicket } = require('../controllers/ticketController');
const { protectRoute } = require('../middlewear/protectRoute');

const router = express.Router();

router.post('/', protectRoute, createTicket)

module.exports = router;