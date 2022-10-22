

import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";
import Http from './http'

class UserService{
    

    getPublicContent() {
        return axios.get('http://localhost:8080/api/test/all');
    }

    getUserBoard(){
        return Http.getAuthPrivate().get('/test/user');
    }
    
    getAdminBoard(){
        return Http.getAuthPrivate().get('/test/admin');
    }
}
export default new UserService();