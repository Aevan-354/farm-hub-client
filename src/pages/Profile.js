import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { API } from "../api";
import { getCurrentUser, setCurrentUserDetails } from "../api/current-user";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Fetch user data (You can replace with actual API call)
  useEffect(() => {
    try {
      const userId =getCurrentUser().id;
      API.get(`/profile/${userId}`).then((response) => {
        saveCurrentUser(response.data);
      });
      
    } catch (error) {
      alert('Error getting profile')
    }
  }, []);

const saveCurrentUser =user =>{
  if(!user) return;
  setCurrentUser(user);
  setCurrentUserDetails(user);
}

  const handleFileChange = async (e) => {
    const fileInput = e.target;
    if (!(fileInput && fileInput.files.length)) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePicUpload =async e =>{
    e.preventDefault();
    try {
      const {data: {user, message}} =await API.put(`/profile/${currentUser.id}`, {profile_image: profilePic});
      saveCurrentUser(user);
      alert(message)
    } catch ({message}) {
      alert(message)
    }
  }
  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data: {user, message}} =await API.put(`/profile/${currentUser.id}`, { currentPassword, newPassword });
      saveCurrentUser(user)
      alert(message);
    } catch (error) {
      alert("Error updating password");
    }
  };



  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-4">
        <Row>
          <Col md={4} className="text-center">
            <img
              src={(currentUser.profile_image && currentUser.profile_image) ?? "https://cdn.pixabay.com/photo/2015/10/18/20/15/woman-995164_1280.png"}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{currentUser.name}</h4>
            <p className="text-muted">{currentUser.email}</p>
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
                  <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e)} required />
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
