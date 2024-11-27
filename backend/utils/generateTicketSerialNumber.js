const generateTicketSerialNumber = () => {

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const randomPart = String(Math.floor(1000 + Math.random() * 9000));

    const prefix = 'TKT';


    const serialNumber = `${prefix}-${year}${month}${day}-${randomPart}`;

    return serialNumber;
}

module.exports = { generateTicketSerialNumber }