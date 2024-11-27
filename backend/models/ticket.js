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

module.exports = {
    createTicket
}