export const isAuthenticated = () => {
    return !!localStorage.getItem('userToken');
};
