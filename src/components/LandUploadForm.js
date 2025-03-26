import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./LandUploadForm.css";
import { postLand } from "../api/upload-land-api";
import { getCurrentUser } from "../api/get-current-user";


const LandUploadForm = ({ setLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    size: "",
    image_url: "",
  });

  const handleFileChange =(e) =>{
    const fileInput = e.target;
    if(!(fileInput && fileInput.files.length)) return;
    const file = fileInput && fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image_url: reader.result });
    };
    reader.readAsDataURL(file);
  }

  const [uploading, setUploading] = useState(false); // ✅ Track Upload State

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    
    e.preventDefault();
    setUploading(true); // ✅ Show Uploading
    setLoading(true); // ✅ Activate Loader in Parent Component
    const message =await postLand({...formData, owner_id: getCurrentUser().id})
    
    // Simulate API Call
    console.log("Form Data Submitted:", formData);
    setUploading(false); // ✅ Hide Uploading
    setLoading(false); // ✅ Hide Loader in Parent Component
    alert(message); // ✅ User Feedback
  };

  return (
    <Container className="upload-form-container">
      <h2 className="text-center mb-4">Upload Land</h2>

      {/* Form */}
      <Form className="form-box" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter land title"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price (Ksh)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Size </Form.Label>
          <Form.Control
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter land size"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Land Image</Form.Label>
          <Form.Control
            type="file"
            name="image_url"
            onChange={ e =>handleFileChange (e)}
          />
        </Form.Group>

        {/* Upload Button with Loading Indicator */}
        <Button type="submit" className="upload-btn mt-3" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Land"}
        </Button>
      </Form>
    </Container>
  );
};

export default LandUploadForm;
