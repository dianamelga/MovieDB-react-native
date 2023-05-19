import axios from 'axios';

const ApiMovies = axios.create({
    baseURL: `${BASE_URL}/movie`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default ApiMovies;