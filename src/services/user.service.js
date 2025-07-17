import api from '../api/api.js';

class UserService {
    createUser(userData) {
        return api.post('user', userData);
    }
    getAllUsers() {
        return api.get('user');
    }
    getUserById(id) {
        return api.get(`user/${id}`);
    }
}

export default new UserService();