const { query } = require('express');
const db = require('../config/db');

const createTicket = (ticketData) => {

    const { serial_number, client_name, client_address, client_contact_details, amount, created_by, assigned_to } = ticketData;

    const query = 'INSERT INTO tickets (serial_number, client_name,client_address,client_contact_details,amount,created_by, assigned_to) VALUES (?,?,?,?,?,?,?)';

    return new Promise((resolve, reject) => {
        db.query(query, [serial_number, client_name, client_address, client_contact_details, amount, created_by, assigned_to],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: result.insertId, serial_number, client_name, client_address, client_contact_details, amount, created_by, assigned_to });
                }
            }
        )
    })
}

const getTicketById = (id) => {
    const query = 'SELECT * FROM tickets WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result.length > 0 ? result[0] : null);
            }
        })
    })
}

const getTicketByUser = (id) => {
    const query = 'SELECT * FROM tickets WHERE created_by = ? OR assigned_to = ? ORDER BY created_at DESC';

    return new Promise((resolve, reject) => {
        db.query(query, [id, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getAllTickets = () => {
    const query = 'SELECT * FROM tickets';  // Use const or let here

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

// ticketModel.js
const updateTicket = (id, ticketData) => {
    const { client_name, client_address, client_contact_details, amount, assigned_to, status } = ticketData;
    const fieldsToUpdate = [];
    const values = [];

    if (client_name) {
        fieldsToUpdate.push("client_name = ?");
        values.push(client_name);
    }
    if (client_address) {
        fieldsToUpdate.push("client_address = ?");
        values.push(client_address);
    }
    if (client_contact_details) {
        fieldsToUpdate.push("client_contact_details = ?");
        values.push(client_contact_details);
    }
    if (amount) {
        fieldsToUpdate.push("amount = ?");
        values.push(amount);
    }
    if (assigned_to) {
        fieldsToUpdate.push("assigned_to = ?");
        values.push(assigned_to);
    }
    if (status) {
        fieldsToUpdate.push("status = ?");
        values.push(status); // Update status
    }

    values.push(id);

    const query = `UPDATE tickets SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                reject('Ticket not found');
            } else {
                resolve(result);
            }
        });
    });
};

const deleteTicket = (id) => {

    const query = 'DELETE FROM tickets WHERE id = ?'

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                reject('Ticket not found');
            }
            else {
                resolve(result);
            }
        })
    })
}

module.exports = {
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket,
    getAllTickets,
    getTicketByUser
}