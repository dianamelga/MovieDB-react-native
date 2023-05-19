import axios from 'axios';

const ApiMovieGenres = axios.create({
    baseURL: `${BASE_URL}/genre`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default ApiMovieGenres;