import Http from './http'
import axios from "axios";
import authHeader from './auth-header';

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return axios.get({
            baseURL: "http://localhost:8080/api/user/all",
            headers: 
              authHeader()
            
        });
    }

    userSave(){
        return Http.getAuthPrivate().post('/user/save');
    }
    
    updateUser(){
        return Http.getAuthPrivate().updated('/user/update');
    }

    filterUsers(){
        return Http.getAuthPrivate().post('/user/filter');
    }

    deleteOrder(id) {
        return Http.getAuthPrivate().delete(`/user/delete/${id}`);
    }
}
export default new UserService();