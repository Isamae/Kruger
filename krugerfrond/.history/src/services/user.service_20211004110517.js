import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/";

class UserService{
    

    getPublicContent() {
        return axios.create(API_URL,{headers: authHeader()}).get('all');
    }

    getUserBoard(){
        return axios.get(API_URL+'user',{headers: authHeader()});
    }
    
    getAdminBoard(){
        return axios.get(API_URL+'admin',{headers: authHeader()});
    }
}
export default new UserService();