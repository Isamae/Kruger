import Http from './http'
import axios from "axios";

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return axios.get({
            baseURL: "http://localhost:8080/api,
            headers: 
              authHeader()
            
        })  getAuthPrivate().get('/user/all');
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