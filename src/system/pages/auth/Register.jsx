import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [registerType, setRegisterType] = useState('user');
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '', phone_number: '', password: '',
        interests: '', industry: '', occupation: '', company: '', organisation_name: ''
    });
    const [error, setError] = useState('');
    const { registerUser, registerExhibitor } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (registerType === 'user') {
                await registerUser(formData);
                navigate('/user-dashboard');
            } else {
                await registerExhibitor(formData);
                navigate('/exhibitor-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <select value={registerType} onChange={(e) => setRegisterType(e.target.value)}>
                <option value="user">Register as User</option>
                <option value="exhibitor">Register as Exhibitor</option>
            </select>

            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                {registerType === 'user' ? (
                    <>
                        <div>
                            <label>Interests (comma-separated):</label>
                            <input type="text" name="interests" value={formData.interests} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Industry:</label>
                            <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Occupation:</label>
                            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Company:</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} />
                        </div>
                    </>
                ) : (
                    <div>
                        <label>Organisation Name:</label>
                        <input type="text" name="organisation_name" value={formData.organisation_name} onChange={handleChange} required />
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;