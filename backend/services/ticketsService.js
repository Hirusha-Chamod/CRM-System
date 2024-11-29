const ticketModel = require('../models/ticket');
const { generateTicketSerialNumber } = require('../utils/generateTicketSerialNumber');

const createTicket = async (ticketData, userId) => {
    try {

        const serialNumber = await generateTicketSerialNumber();

        const completeTicket = {
            ...ticketData,
            serial_number: serialNumber,
            created_by: userId,
            assigned_to: userId
        }

        const results = await ticketModel.createTicket(completeTicket);
        return results;
    } catch (error) {
        console.log(error);
    }
}

const getTicketById = async (id) => {
    try {
        const ticket = await ticketModel.getTicketById(id);
        return ticket;
    } catch (error) {
        console.log(error);
    }
}

const getTicketByUser = async (id) => {
    try {
        const tickets = await ticketModel.getTicketByUser(id);
        return tickets;
    } catch (error) {
        console.error("Error in ticket service:", error);
        throw new Error("Error retrieving tickets");
    }
};


const getAllTickets = async () => {
    try {
        const tickets = await ticketModel.getAllTickets();
        return tickets;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (id, ticketData) => {
    try {

        const ticket = await ticketModel.updateTicket(id, ticketData);
        return ticket;

    } catch (error) {
        console.log(error);

    }
}

const deleteTicket = async (id) => {
    try {
        const results = await ticketModel.deleteTicket(id);
        return results;

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket,
    getAllTickets,
    getTicketByUser
}