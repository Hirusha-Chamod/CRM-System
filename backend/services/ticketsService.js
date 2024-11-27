const ticketModel = require('../models/ticket');
const { generateTicketSerialNumber } = require('../utils/generateTicketSerialNumber');

const createTicket = async (ticketData, userId) => {
    try {

        const serialNumber = await generateTicketSerialNumber();

        const completeTicket = {
            ...ticketData,
            serial_number: serialNumber,
            created_by: userId,
            current_owner: userId
        }

        const results = await ticketModel.createTicket(completeTicket);
        return results;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTicket
}