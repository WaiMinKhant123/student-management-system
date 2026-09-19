import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import Form from '../components/Form';

const Edit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', class_name: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Current Student ID:", id);
    const fetchStudent = async () => {
      try {
        const response = await studentService.getById(id);
        const student = response.data;
        setFormData({
          name: student.name || '',
          email: student.email || '',
          phone: student.phone || '',
          class_name: student.school_class?.name || '',
        });
      } catch (err) {
        alert('Student not found!');
        navigate('/');
      } finally {
        setFetching(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await studentService.update(id, formData);
      alert('Student updated successfully!');
      navigate('/');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert('Failed to update student.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading student details...</p>;

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Edit Student</h2>
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
        isEdit={true}
      />
    </div>
  );
};

export default Edit;