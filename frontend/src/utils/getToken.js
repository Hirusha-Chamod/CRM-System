export const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
};