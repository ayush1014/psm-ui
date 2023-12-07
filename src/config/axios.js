import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:5010/psm/'
    baseURL: 'https://posting-media-backend.onrender.com/psm/'
})


export default api;