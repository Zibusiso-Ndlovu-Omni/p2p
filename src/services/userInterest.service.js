import api from '../api/api.js';

class UserInterestService {
    createUserInterest(data) {
        return api.post('user-interest/', data);
    }
    getAllUserInterests() {
        return api.get('user-interest/');
    }
    getUserInterestById(id) {
        return api.get(`user-interest/${id}`);
    }

    addNotesToInterest(data) {
        return api.put('user-interest/add-notes/', data);
    }

    editExhibitorNotes(data) {
        return api.put('user-interest/add-exhibitor-notes/', data);
    }

    updateUserInterest(id, data) {
        return api.put(`user-interest/${id}`, data);
    }
    deleteUserInterest(id) {
        return api.delete(`user-interest/${id}`);
    }
    getUserInterestsByUserId(user_id) {
        return api.get(`user-interest/user/${user_id}`);
    }
    getInterestsByOrganisationId(organisation_id) {
        return api.get(`user-interest/organisation/${organisation_id}`);
    }
}

export default new UserInterestService();
