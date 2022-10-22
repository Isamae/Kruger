

import Http from './http'

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return Http.getAuthPrivate().get('/user/all');
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
        return http.delete(`/user/delete/${id}`);
    }
}
export default new UserService();