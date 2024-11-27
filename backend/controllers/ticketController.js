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

module.exports = {
    createTicket
}