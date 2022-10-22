import Http from './http';

class UserService{
    getPublicContent() {
        return Http.getAuthPublic().get('/test/all');
    }

    getUsers(){
        return Http.getAuthPrivate().get('/user/all');
    }

    getUser(id){
        return Http.getAuthPrivate().get(`/user/edit/${id}`);
    }

    saveUser(data){
        return Http.getAuthPrivate().post('/user/save',data);
    }
    
    updateUser(data){
        return Http.getAuthPrivate().updated('/user/update',data);
    }

    filterUsers(){
        return Http.getAuthPrivate().post('/user/filter');
    }

    deleteOrder(id) {
        return Http.getAuthPrivate().delete(`/user/delete/${id}`);
    }
}
export default new UserService();