import React, { useState, useRef, useContext } from "react";
import { Container, TextField, Button, Typography, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { UserContext } from "@/context/UserContext";

// import img from "@/assets/Support/support-img.jpg";

import style from "./css/Support.module.css";

// Components
import Dropdown from "@/components/Dropdown/Dropdown.module"; 
import Footer from "@/components/Footer/Footer.module";

const SupportText = () => (
  <div className={style.supportText}>
    <Typography variant="h4" gutterBottom>
    Is there something you want to inform us about?
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
    (i.e. incidents, repairs, feedback etc.)
    </Typography>
  </div>
);

const SupportImage = () => (
  <div className={style.imgContainer}>
    <img src="https://via.placeholder.com/400" alt="Placeholder" className={style.img} />
  </div>
);

const SupportForm = () => {
  const [form, setForm] = useState({ location: '', urgency: '', description: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDropdownChange = (urgency) => {
    setForm({ ...form, urgency });
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
    try {
      await axios.post('http://localhost:3001/api/support', form); 
      setForm({ location: '', urgency: '', description: '' });
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const urgencyOptions = [
    { name: 'None (feedback)', action: () => handleDropdownChange('None (feedback)') },
    { name: 'Low (people are not too affected)', action: () => handleDropdownChange('Low (people are not too affected)') },
    { name: 'Medium (people are moderately affected)', action: () => handleDropdownChange('Medium (people are moderately affected)') },
    { name: 'High (people are severely affected)', action: () => handleDropdownChange('High (people are severely affected)') },
  ];

  return (
    <form onSubmit={handleSubmit} className={style.supportForm}>
      <TextField
        name="location"
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.location}
        onChange={handleInputChange}
        required
      />
      <div className={style.dropdownWrapper}>
        <Button
          variant="outlined"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {form.urgency || 'Select Urgency'}
        </Button>
        <Dropdown
          ref={dropdownRef}
          subitems={urgencyOptions}
          dropdown={dropdownOpen}
          onMouseLeave={() => setDropdownOpen(false)}
        />
      </div>
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={form.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" className={style.submitButton}>
        Submit
      </Button>
    </form>
  );
};


export default function Support() {
  return (
    <>
      <SupportText />
      <Container className={style.supportContainer}>
        <SupportForm />
        <SupportImage />
      </Container>
      <Footer />
    </>
  );
}
