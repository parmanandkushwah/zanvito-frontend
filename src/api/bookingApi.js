// src/api/bookingApi.js
import api from "./axios";
import { jwtDecode } from "jwt-decode";

export const getCustomerBookings = async () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const customerId = decoded.id;

  const res = await api.get(`/bookings/${customerId}/customer`);
  return res.data;
};

export const getCustomerBookingDetails = async (bookingId) => {
  const res = await api.get(`/bookings/customer/${bookingId}`);
  return res.data;
};