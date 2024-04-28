import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function VerifyOrder() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        mobile: '',
        email: ''
    });

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
       
        // Lưu dữ liệu vào Local Storage
        localStorage.setItem("Product", JSON.stringify(formData));       
         // Hiển thị dữ liệu đã lưu trong Local Storage
         console.log('Dữ liệu đã được lưu trong Local Storage:', JSON.parse(localStorage.getItem('orderInfo')));
    };

   
  
  return (
    <Container>
    <h1>Verify Order</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="fname" value={formData.fname} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lname" value={formData.lname} onChange={handleChange}  required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address}  onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" placeholder="Enter mobile number" name="mobile" value={formData.mobile} onChange={handleChange}  required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email"  value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Button href='/payment' variant="primary" type="submit">Continue</Button>
    </Form>
</Container>
  )
}

export default VerifyOrder