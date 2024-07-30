import React, { useState } from 'react';

// components
import Navbar from '@/components/Navbar/Navbar.module'; // Importing the Navbar component
import Footer from '@/components/Footer/Footer.module'; // Importing the Footer component
import Button from '@/components/Button/CustomButton.module'; // Importing the existing Button component
import Dropdown from '@/components/Dropdown/Dropdown.module'; // Importing the existing Dropdown component

import './css/Support.css';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    urgency: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
  };

  return (
    <div className="enquiry-form-container">
      <div className="form-section">
        <h2>Is there something you want to inform us about?</h2>
        <p>(i.e. incidents, repairs, feedback etc.)</p>
        <form onSubmit={handleSubmit} className="enquiry-form">
          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location..."
            />
          </label>
          <label>
            Urgency
            <Dropdown
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select urgency level...' },
                { value: 'None', label: 'None (message, feedback etc.)' },
                { value: 'Low', label: 'Low (people are not too affected)' },
                { value: 'Medium', label: 'Medium (people are moderately affected)' },
                { value: 'High', label: 'High (people are severely affected)' },
              ]}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter details..."
            ></textarea>
          </label>
          <Button type="submit" text="Submit" />
        </form>
      </div>
      <div className="image-container">
        <img src="fsdp\Client\src\assets\Support\enquiries.png" alt="Community Image" />
      </div>
    </div>
  );
};

const EnquiriesPage = () => {
  return (
    <div>
      <Navbar />
      <EnquiryForm />
      <Footer />
    </div>
  );
};

export default EnquiriesPage;