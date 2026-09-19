import React from 'react';
import InputField from '../components/Input';

const Form = ({ formData, handleChange, handleSubmit, errors, loading, isEdit = false }) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. Aung Aung"
        error={errors.name}
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g. aung@gmail.com"
        error={errors.email}
      />

      <InputField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="e.g. 09123456789"
        error={errors.phone}
      />

      <InputField
        label="Class Name"
        name="class_name"
        value={formData.class_name}
        onChange={handleChange}
        placeholder="e.g. Final Year CS"
        error={errors.class_name}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isEdit ? '#28a745' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Processing...' : isEdit ? 'Update Student' : 'Register Student'}
      </button>
    </form>
  );
};

export default Form;