const express = require('express');
const { createTicket, getTicketById, getAllTickets, updateTicket, deleteTicket, getTicketByUser } = require('../controllers/ticketController');
const { protectRoute } = require('../middlewear/protectRoute');

const router = express.Router();

router.post('/', protectRoute, createTicket)

router.get('/', getAllTickets)

router.get('/:id', getTicketById)

router.get('/user/:id', getTicketByUser)

router.put('/:id', updateTicket)

router.delete('/:id', deleteTicket)

module.exports = router;