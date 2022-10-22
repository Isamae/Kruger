

import axios from "axios";
import Http from './http'

class UserService{
    getPublicContent() {
        return axios.getPublicContent().get('test/all');
    }

    getUserBoard(){
        return Http.getAuthPrivate().get('/test/user');
    }
    
    getAdminBoard(){
        return Http.getAuthPrivate().get('/test/admin');
    }
}
export default new UserService();