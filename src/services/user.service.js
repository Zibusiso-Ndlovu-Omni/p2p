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
    updateUser(id, data) {
        return api.put(`user/${id}`, data);
    }
    changePassword(id, data) {
        return api.put(`user/change-password/${id}`, data);
    }
    searchUserByEmail(email) {
        return api.get(`user/search`, { params: { email } });
    }
    deleteUser(id) {
        return api.delete(`user/${id}`);
    }
}

export default new UserService();