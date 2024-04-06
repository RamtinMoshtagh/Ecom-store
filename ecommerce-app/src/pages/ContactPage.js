import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 150px;
`;

const Alert = styled.div`
  background-color: #f44336;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
      isValid = false;
    }

    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
      isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
      isValid = false;
    }

    if (!formData.body || formData.body.length < 3) {
      newErrors.body = 'Body must be at least 3 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log('Form Data:', formData);
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: '',
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        {success && <SuccessMessage>Message sent successfully!</SuccessMessage>}
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <Alert>{errors.fullName}</Alert>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
          {errors.subject && <Alert>{errors.subject}</Alert>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <Alert>{errors.email}</Alert>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Message</Label>
          <TextArea id="body" name="body" value={formData.body} onChange={handleChange} />
          {errors.body && <Alert>{errors.body}</Alert>}
        </FormGroup>
        {/* Pass onClick prop to Button component */}
        <Button type="submit" onClick={() => {}}>Send Message</Button>
      </Form>
    </ContactContainer>
  );
};

export default ContactPage;
