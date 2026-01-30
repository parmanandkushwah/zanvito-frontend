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

export const createBookingDraft = async (payload) => {
  const res = await api.post("/booking-draft/create", payload);
  return res.data;
};


export const getBookingBill = async (draftId) => {
  const res = await api.get(`/booking-draft/${draftId}/bill`);
  return res.data;
};

export const updateBookingDateTime = async (draftId, payload) => {
  const res = await api.patch(
    `/${draftId}/update-time`,
    payload
  );
  return res.data;
};


export const checkoutBooking = async (payload) => {
  const res = await api.post("/bookings/checkout", payload);
  return res.data;
};

export const getBookingPaymentStatus = async (bookingId) => {
  const res = await api.get(`/bookings/${bookingId}/payment-status`);
  return res.data;
};
