import axios from "axios";
//import authHeader from './auth-header';

//const API_URL = "http://localhost:8080/api/test/";
import Http from './http'

class UserService{
    

    getPublicContent() {
        return Http.getAuthPublic().get(API_URL+'all');
    }

    getUserBoard(){
        return Http.get(API_URL+'user',{headers: authHeader()});
    }
    
    getAdminBoard(){
        return Http.get(API_URL+'admin',{headers: authHeader()});
    }
}
export default new UserService();