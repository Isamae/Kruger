
import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api";

class Http{

    getAuthPublic() {
        return axios.create({
            baseURL: API_URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
           
        })
    }

    getAuthPrivate(){
        return axios.create({
            baseURL: API_URL,
            headers: 
              authHeader()
            
        })
    }
}
export default new Http();