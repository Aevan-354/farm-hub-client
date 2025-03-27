import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import bg25 from "./assets/bg25.jpg";
import "./index.css";
import UploadLand from "./pages/UploadLand";
import MyBiddings from './components/MyBiddings';
import RentedLands from './components/RentedLands';
import PaymentTable from './components/PaymentTable';
import ReviewForm from "./components/ReviewForm";
import Profile from "./pages/Profile"
import MarketPlace from "./components/BidForm";
import BidPage from "./pages/BidPage";

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${bg25})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={<PrivateRoute />} >
            <Route index element={<Dashboard />} />
            <Route path="upload-land" element={<UploadLand />} /> 
            <Route path="my-biddings" element={<MyBiddings />} /> 
            <Route path="rented-lands" element={<RentedLands />} /> 
            <Route path="payments" element={<PaymentTable />} /> 
            <Route path="reviews" element={<ReviewForm />} /> 
            <Route path="profile" element={<Profile />} />
            <Route path="market-place" element={<MarketPlace/>} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
