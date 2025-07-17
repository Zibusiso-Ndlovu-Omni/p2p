import api from '../api/api.js';

class AuthService {
    userLogin(data) {
        return api.post('auth/user-login/', data);
    }

    exhibitorLogin(data) {
        return api.post('auth/exhibitor-login/', data);
    }

    logout() {
        return api.post('auth/logout/');
    }

}

export default new AuthService();