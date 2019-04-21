import axios from 'axios'

let token = localStorage.getItem("token")
const server = axios.create({
    baseURL: 'http://hypeleash-server.michaeltim.com',
    headers: {
        token
    }
})

export default server