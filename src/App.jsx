import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllServices from "./pages/AllServices";
import ServiceDetails from "./pages/ServiceDetails";
import CategoryServices from "./pages/ServiceDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerify from "./pages/OtpVerify";
import AllCategories from "./pages/AllCategories";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
<Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/category/:categoryId" element={<CategoryServices />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-bookings/:id" element={<BookingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
