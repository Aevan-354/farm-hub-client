import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({ name: "Aevan", email: "aevan@example.com", profile_pic: "" });
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Fetch user data (You can replace with actual API call)
  useEffect(() => {
    axios.get("/api/profile").then((response) => {
      setUser(response.data);
    });
  }, []);

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile/update-password", { currentPassword, newPassword });
      alert("Password updated successfully");
    } catch (error) {
      alert("Error updating password");
    }
  };

  // Handle profile picture upload
  const handleProfilePicUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      const response = await axios.post("/api/profile/upload-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, profile_pic: response.data.profilePic }));
    } catch (error) {
      alert("Error uploading profile picture");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-4">
        <Row>
          <Col md={4} className="text-center">
            <img
              src={user.profile_pic ? `/uploads/${user.profile_pic}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{user.name}</h4>
            <p className="text-muted">{user.email}</p>
          </Col>

          <Col md={8}>
            {/* Change Password */}
            <Card className="mb-3 p-3">
              <h5>Change Password</h5>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Update Password
                </Button>
              </Form>
            </Card>

            {/* Upload Profile Picture */}
            <Card className="p-3">
              <h5>Upload Profile Picture</h5>
              <Form onSubmit={handleProfilePicUpload}>
                <Form.Group className="mb-2">
                  <Form.Control type="file" onChange={(e) => setProfilePic(e.target.files[0])} required />
                </Form.Group>
                <Button type="submit" variant="success" className="w-100">
                  Upload
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
