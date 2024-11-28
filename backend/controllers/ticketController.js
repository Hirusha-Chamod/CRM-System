const ticketService = require('../services/ticketsService');

const createTicket = async (req, res) => {
    try {

        const {
            client_name,
            client_address,
            client_contact_details,
            amount
        } = req.body;

        // Validate input
        if (!client_name || !client_address || !client_contact_details || !amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Create ticket using the service
        const newTicket = await ticketService.createTicket({
            client_name,
            client_address,
            client_contact_details,
            amount
        }, req.user.id);

        res.status(201).json({
            success: true,
            ticket: newTicket
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const getTicketById = async (req, res) => {
    try {

        const ticketId = req.params.id;

        const ticket = await ticketService.getTicketById(ticketId);
        res.status(200).json({
            success: true,
            ticket
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }
}

const getAllTickets = async (req, res) => {
    try {

        const tickets = await ticketService.getAllTickets();

        res.status(200).json({
            success: true,
            tickets
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateTicket = async (req, res) => {
    try {

        const ticketId = req.params.id;
        const ticketData = req.body;

        const updatedTicket = await ticketService.updateTicket(ticketId, ticketData);

        res.status(200).json({
            success: true,
            ticket: updatedTicket
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const deleteTicket = async (req, res) => {
    try {

        const ticketId = req.params.id;

        await ticketService.deleteTicket(ticketId);

        res.status(200).json({
            success: true,
            message: "Ticket deleted"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = {
    createTicket,
    getTicketById,
    getAllTickets,
    updateTicket,
    deleteTicket
}