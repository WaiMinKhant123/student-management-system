import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, error }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: error ? '1px solid red' : '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
      {error && <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>{error[0]}</span>}
    </div>
  );
};

export default InputField;