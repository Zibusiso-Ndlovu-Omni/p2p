import api from '../api/api.js';

class ExhibitorService {
    createExhibitor(data) {
        return api.post('exhibitor/', data);
    }

    getAllExhibitors() {
        return api.get('exhibitor/');
    }

    getExhibitorById(id) {
        return api.get(`exhibitor/${id}`);
    }

    updateExhibitor(id, data) {
        return api.put(`exhibitor/${id}`, data);
    }

    deleteExhibitor(id) {
        return api.delete(`exhibitor/${id}`);
    }

    getExhibitorsByOrganisation(organisation_id) {
        return api.get(`exhibitor/organisation/${organisation_id}`);
    }
}

export default new ExhibitorService();