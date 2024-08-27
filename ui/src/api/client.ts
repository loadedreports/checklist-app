import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7263/api',
})

export default apiClient