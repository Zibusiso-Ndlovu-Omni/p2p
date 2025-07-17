import api from '../api/api.js';

class UserService {
    getUserById(id) {
        return api.get(`user/${id}`);
    }
}

export default new UserService();