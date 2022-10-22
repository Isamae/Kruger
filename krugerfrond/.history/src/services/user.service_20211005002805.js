

import axios from "axios";
import Http from './http'

class UserService{
    

    getPublicContent() {
        return axios.get('http://localhost:8080/api/orders/all');
    }

    getUserBoard(){
        return Http.getAuthPrivate().get('/test/user');
    }
    
    getAdminBoard(){
        return Http.getAuthPrivate().get('/test/admin');
    }
}
export default new UserService();