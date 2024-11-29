export const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};