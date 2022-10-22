
//import authHeader from './auth-header';

//const API_URL = "http://localhost:8080/api/test/";
import Http from './http'

class UserService{
    

    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUserBoard(){
        return Http.getAuthPrivate().get('/test/user');
    }
    
    getAdminBoard(){
        return Http.getAuthPrivate().get('/test/admin');
    }
}
export default new UserService();