import api from '../api/api.js';

class ProductService {
    createProduct(data) {
        return api.post('product/', data);
    }

    getAllProducts() {
        return api.get('product/');
    }
    getProductById(id) {
        return api.get(`product/${id}`);
    }
    updateProduct(id, data) {
        return api.put(`product/${id}`, data);
    }
    deleteProduct(id) {
        return api.delete(`product/${id}`);
    }
    getProductsByOrganisationId(organisation_id) {
        return api.get(`product/organisation/${organisation_id}`);
    }
    registerInterest(productId, data) {
        return api.post(`product/${productId}/register-interest`, data);
    }
}

export default new ProductService();