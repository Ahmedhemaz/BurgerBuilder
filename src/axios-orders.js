import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-2e14e.firebaseio.com/'
});

export default instance;