
import axios from "axios";
const API_URL = "http://localhost:8080/api";
import authHeader from './auth-header';

class UserService{

    getAuthPublic() {
        return axios.create({
            baseURL: API_URL,
            headers: {
              "Content-type": "application/json"
            }
          })
    }

    getAuthPrivate(){
        return axios.create({
            baseURL: API_URL,
            headers: {
                authHeader()
            }
          })
    }
}
export default new UserService();