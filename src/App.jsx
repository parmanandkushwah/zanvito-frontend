import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AvailabilityProvider } from "./context/AvailabilityContext";

import Home from "./pages/Home";
import AllServices from "./pages/AllServices";
import ServiceDetails from "./pages/ServiceDetails";
import AllCategories from "./pages/AllCategories";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerify from "./pages/OtpVerify";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <AvailabilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-bookings/:id" element={<BookingDetails />} />
           <Route path="/terms" element={<Terms />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </AvailabilityProvider>
  );
}

export default App;
