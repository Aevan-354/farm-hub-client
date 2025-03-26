import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LandUploadForm from "../components/LandUploadForm";

const UploadLand = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div>

      {/* 🚀 Upload Form */}
      <LandUploadForm setLoading={setLoading} />

      {/* 🔄 Show Loading Spinner When Uploading */}
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
          <p>Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default UploadLand;
