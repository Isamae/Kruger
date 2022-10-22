

import Http from './http'

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUserBoard(){
        return Http.getAuthPrivate().get('/user/save');
    }
    
    getAdminBoard(){
        return Http.getAuthPrivate().get('/user/update');
    }

    getAdminBoard(){
        return Http.getAuthPrivate().get('/user/filter');
    }
}
export default new UserService();