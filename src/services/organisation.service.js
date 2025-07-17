import api from '../api/api.js';

class OrganisationService {
    createOrganisation(data) {
        return api.post('organisation/', data);
    }

    getAllOrganisations() {
        return api.get('organisation/');
    }

    getOrganisationById(id) {
        return api.get(`organisation/${id}`);
    }

    updateOrganisation(id, data) {
        return api.put(`organisation/${id}`, data);
    }

    deleteOrganisation(id) {
        return api.delete(`organisation/${id}`);
    }
}

export default new OrganisationService();