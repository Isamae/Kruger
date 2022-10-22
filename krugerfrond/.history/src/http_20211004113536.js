
import axios from "axios";
const API_URL = "http://localhost:8080/api";

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
              "Content-type": "application/json"
            }
          })
    }
}
export default new UserService();