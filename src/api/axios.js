import axios from 'axios';

export default axios.create({
	baseURL: 'https://digitalgardenserver.herokuapp.com/api/digitalgarden'
});

// http://localhost:5000/api/digitalgarden
