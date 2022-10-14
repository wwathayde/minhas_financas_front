import axios from "axios";

const httpClient = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL:'https://wesley-financas-backend.herokuapp.com'
})

class ApiService {
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    post(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, objeto)
    }

    put(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    delete(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl)
    }
}

export default ApiService;
