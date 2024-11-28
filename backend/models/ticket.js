const { query } = require('express');
const db = require('../config/db');

const createTicket = (ticketData) => {

    const { serial_number, client_name, client_address, client_contact_details, amount, created_by, current_owner } = ticketData;

    const query = 'INSERT INTO tickets (serial_number, client_name,client_address,client_contact_details,amount,created_by, current_owner) VALUES (?,?,?,?,?,?,?)';

    return new Promise((resolve, reject) => {
        db.query(query, [serial_number, client_name, client_address, client_contact_details, amount, created_by, current_owner],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: result.insertId, serial_number, client_name, client_address, client_contact_details, amount, created_by, current_owner });
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

const updateTicket = (id, ticketData) => {

    const { client_name, client_address, client_contact_details, amount, current_owner } = ticketData;
    const query = 'UPDATE tickets SET  client_name = ?, client_address = ?, client_contact_details = ?, amount = ?, current_owner = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [client_name, client_address, client_contact_details, amount, current_owner, id], (err, result) => {
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
    getAllTickets
}