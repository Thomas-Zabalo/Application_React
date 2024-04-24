export const isAuthenticated = () => {
    return !!localStorage.getItem('userToken');
};

export const isAdmin = () => {
    return !!localStorage.getItem('userAdmin');
};