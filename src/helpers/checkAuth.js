export const checkAuth = (data) => {
    if(data.response.status === 401 && location.pathname !== '/login') {

        return location.replace('/login');
    }
    return data;
}