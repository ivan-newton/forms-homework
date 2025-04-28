import React, { useState } from 'react';
import './App.css';

function BasicForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Validation function f
  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value.trim()) {
        return 'Name is required.';
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        return 'Email is required.';
      } else if (!value.includes('@')) {
        return 'Email must include an "@" sign.';
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        return 'Phone number is required. Digits only';
      } else if (!/^\d+$/.test(value)) {
        return 'Phone number must contain only numbers.';
      }
    }

    return '';
  };

  const validateAll = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;
    if (name === 'phone') {
      cleanedValue = value.replace(/\D/g, ''); // remove non-digits
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: cleanedValue,
    }));

    // Real-time error checking
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, cleanedValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateAll();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

   
    setSubmittedData(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Basic Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-info">
          <h3>Submitted Information:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
}

export default BasicForm;



