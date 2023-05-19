import axios from 'axios';

const ApiConfiguration = axios.create({
    baseURL: `${BASE_URL}/configuration`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default ApiConfiguration;