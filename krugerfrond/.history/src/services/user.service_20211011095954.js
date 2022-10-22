

import Http from './http'

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return Http.getAuthPrivate().get('/test/admin');
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