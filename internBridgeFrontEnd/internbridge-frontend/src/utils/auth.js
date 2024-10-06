import jwt_decode from 'jwt-decode';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decoded = jwt_decode(token);
    return decoded.role;
}
return null;
};

export const logout = () => {
localStorage.removeItem('token');
};