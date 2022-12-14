import axios from "axios";

const httpClient = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL:'https://wesley-financas-backend.herokuapp.com'
})

const header = {
    "Access-Control-Allow-Origin": "*"
}

class ApiService {
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    post(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, objeto, header)
    }

    put(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, objeto, header)
    }

    delete(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl, header)
    }

    get(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl, header)
    }
}

export default ApiService;
