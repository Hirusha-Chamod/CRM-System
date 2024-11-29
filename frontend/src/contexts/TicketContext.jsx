import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

// Create the TicketContext
const TicketContext = createContext();

// Custom hook to use TicketContext
export const useTicket = () => {
    return useContext(TicketContext);
};

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async (userId) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.get(`http://localhost:5000/api/tickets/user/${userId}`, config);
            console.log("Fetched tickets:", response.data);
            setTickets(response.data.tickets || response.data);
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setError("Failed to fetch tickets");
        } finally {
            setLoading(false);
        }
    }, []);


    const deleteTicket = async (ticketId) => {
        try {

            console.log("Deleting ticket with id:", ticketId);
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);

            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
        } catch (err) {
            console.error('Failed to delete ticket', err);
            setError('Failed to delete ticket');
        }
    }

    const updateTicket = async (updatedTicket) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.put(`http://localhost:5000/api/tickets/${updatedTicket.id}`, updatedTicket, config);
            console.log("Updated ticket:", response.data);
            setTickets(prevTickets =>
                prevTickets.map(ticket =>
                    ticket.id === updatedTicket.id ? response.data : ticket
                )
            );
        } catch (err) {
            console.error('Failed to update ticket', err);
            setError('Failed to update ticket');
        } finally {
            setLoading(false);
        }
    }

    return (
        <TicketContext.Provider value={{
            tickets,
            loading,
            error,
            fetchTickets,
            deleteTicket,
            updateTicket,
            setTickets
        }}>
            {children}
        </TicketContext.Provider>
    );
};
