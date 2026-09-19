import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import Form from '../components/Form';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', class_name: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    try {
      await studentService.create(formData);
      setMessage('Student created successfully!');
      navigate('/');
      setFormData({ name: '', email: '', phone: '', class_name: '' });
    } catch (err) {
      console.error('Error Details:', err.response);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setMessage('Failed to create student. Check server/CORS config.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>New Student Registration</h2>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
      />
    </div>
  );
};

export default Register;