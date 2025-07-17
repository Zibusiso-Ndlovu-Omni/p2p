import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";

function ProductModal({ onClose, onSubmit }) {
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!productName || !category ) {
            setError('Please fill in all required fields: Product Name, Category.');
            return;
        }

        const productData = {
            organisation_id: decoded.organisation_id,
            exhibitor_id: decoded.exhibitor_id,
            product_name: productName,
            category,
            description,
        };

        if (onSubmit) onSubmit(productData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl animate-scale-in">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl leading-none transition-colors duration-200"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Create New Product</h3>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-6 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="productName" className="block text-gray-700 text-sm font-semibold mb-2">Product Name: <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                            placeholder="e.g., Eco-Friendly Water Bottle"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-semibold mb-2">Category: <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                            placeholder="e.g., Sustainable Goods"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description: <span className="text-red-500">*</span></label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 resize-y"
                            placeholder="A brief description of your product..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
                        >
                            Save Product
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md shadow hover:bg-gray-600 transition duration-200 ease-in-out"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;