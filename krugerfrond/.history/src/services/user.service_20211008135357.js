

import Http from './http'

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return Http.getAuthPrivate().get('/user/save');
    }
    
    updateUser(){
        return Http.getAuthPrivate().get('/user/update');
    }

    filterUsers(){
        return Http.getAuthPrivate().get('/user/filter');
    }
}
export default new UserService();