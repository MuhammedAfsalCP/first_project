import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const initiateCheckout = createAsyncThunk(
  "checkout/initiateCheckout",
  async ({address}, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().User; // Get token from Redux store

      if (!address) throw new Error("Address is required");

      const response = await axios.post(
        `${apiUrl}/payment/checkout/`,
        {address},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data; // Includes payment details from the backend
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Checkout initiation failed.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "checkout/verifyPayment",
  async (paymentResult, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().User;

      const response = await axios.post(
        `${apiUrl}/payment/verifypayment/`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      return response.data; // Backend response after payment verification
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Payment verification failed.";
      toast.error(errorMessage);
      console.log(errorMessage)
      return rejectWithValue(errorMessage);
    }
  }
);

const PaymentSlice = createSlice({
  name: "Payment",
  initialState: {
    loading: false,
    paymentDetails: null,
    error: null,
    paymentVerified: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentVerified = false;
      state.paymentDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentDetails = null;
      })
      .addCase(initiateCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(initiateCheckout.rejected, (state, action) => {
        state.loading = false;
        state.paymentVerified=null
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentVerified = false;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentVerified = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = PaymentSlice.actions;

export default PaymentSlice.reducer;
