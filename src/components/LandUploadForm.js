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
    landType: "",
    soilType: "",
    roadAccess: "",
    climateInfo: "",
    ownerContact: "",
    ownershipType: "",
    legalDocs: "",
    waterAvailability: "",
    electricity: "",
    marketFacilities: "",
    internetAvailability: "",
    image_url: "",
  });

  const handleFileChange = (e) => {
    const fileInput = e.target;
    if (!(fileInput && fileInput.files.length)) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image_url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const message = await postLand({ ...formData, owner_id: getCurrentUser().id });

    console.log("Form Data Submitted:", formData);
    setLoading(false);
    alert(message);
  };

  // Generate Google Maps Link based on location
  const generateGoogleMapsLink = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location)}`;
  };

  return (
    <Container className="upload-form-container">
      <h2 className="text-center mb-4">Upload Land</h2>

      <Form className="form-box" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          {formData.location && (
            <p>
              <a href={generateGoogleMapsLink()} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
            </p>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Price (Ksh)</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" name="size" value={formData.size} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type of Land</Form.Label>
          <Form.Control as="select" name="landType" value={formData.landType} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Soil Type</Form.Label>
          <Form.Control type="text" name="soilType" value={formData.soilType} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Road Accessibility</Form.Label>
          <Form.Control type="text" name="roadAccess" value={formData.roadAccess} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Owner Contact</Form.Label>
          <Form.Control type="text" name="ownerContact" value={formData.ownerContact} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Water Availability</Form.Label>
          <Form.Control type="text" name="waterAvailability" value={formData.waterAvailability} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Electricity Availability</Form.Label>
          <Form.Control type="text" name="electricity" value={formData.electricity} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Nearby Market/Storage Facilities</Form.Label>
          <Form.Control type="text" name="marketFacilities" value={formData.marketFacilities} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Internet & Mobile Network Availability</Form.Label>
          <Form.Control type="text" name="internetAvailability" value={formData.internetAvailability} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Land Image</Form.Label>
          <Form.Control type="file" name="image_url" onChange={handleFileChange} />
        </Form.Group>

        <Button type="submit" className="upload-btn mt-3">Upload Land</Button>
      </Form>
    </Container>
  );
};

export default LandUploadForm;
