const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/users'
    : 'https://payment-form-pn3n.onrender.com/api/users';

export default API_URL;
