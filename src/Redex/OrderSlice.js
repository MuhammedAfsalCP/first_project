import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const initiateCheckout = createAsyncThunk(
    "checkout/initiateCheckout",
    async ({ address }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().User; // Get token from Redux store

            if (!address) throw new Error("Address is required");

            const response = await axios.post(
                `${apiUrl}/payment/checkout/`,
                { address },
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

export const getOrder = createAsyncThunk(
    "cart/getOrder",
    async (_, { rejectWithValue, getState }) => {

        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }

            const response = await axios.get(
                `${apiUrl}/orders/orderview/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data; // Success response
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const updateStatus = createAsyncThunk(
    "cart/updateStatus", // Corrected name
    async ({ orderid, method }, { rejectWithValue, getState }) => {
        console.log(method)
        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }

            const response = await axios.put(
                `${apiUrl}/orders/orderupdate/${orderid}/`,
                { method },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Success response
        } catch (error) {
            console.log("error", error)
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const getOrderid = createAsyncThunk(
    "cart/getOrderid",
    async (_, { rejectWithValue, getState }) => {

        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }

            const response = await axios.get(
                `${apiUrl}/orders/allorder/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data; // Success response
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);
export const fetchSpesificorder = createAsyncThunk(
    "products/fetchSpesificorder",
    async (orderId, { rejectWithValue,getState }) => {
        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }
            // Sending GET request to the API with category as part of the URL
            const response = await axios.get(`${apiUrl}/orders/sepecificorder/${orderId}/`, {
                headers: {
                    
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response.data)
            return response.data;  // Return the data from the API
        } catch (error) {
            console.log(error)
            // Handling error and returning the error message
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const updateorder = createAsyncThunk(
    "products/updateorder",
    async ({orderId,method}, { rejectWithValue,getState }) => {
        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }
            // Sending GET request to the API with category as part of the URL
            const response = await axios.put(`${apiUrl}/orders/sepecificorder/${orderId}/`, { method },{
                headers: {
                    
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response.data)
            return response.data;  // Return the data from the API
        } catch (error) {
            console.log(error)
            // Handling error and returning the error message
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);



const OrderSlice = createSlice({
    name: "Order",
    initialState: {
        loading: false,
        paymentDetails: null,
        error: null,
        paymentVerified: false,
        orderdData: null,
        orderid: null,
        spesificorder: null
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
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderdData = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update the specific cart item in cartData

            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderid.fulfilled, (state, action) => {
                state.loading = false;
                state.orderid = action.payload;
            })
            .addCase(getOrderid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSpesificorder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpesificorder.fulfilled, (state, action) => {
                state.loading = false;
                state.spesificorder = action.payload;
            })
            .addCase(fetchSpesificorder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export default OrderSlice.reducer;
