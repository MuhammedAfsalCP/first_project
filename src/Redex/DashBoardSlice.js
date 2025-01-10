import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const totalRevanue = createAsyncThunk(
    "products/totalRevanue",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().User; // Accessing token from the Redux store
            if (!token) {
                throw new Error("No token available");
            }
            // Sending GET request to the API with category as part of the URL
            const response = await axios.get(`${apiUrl}/orders/totalpayment/`, {
                headers: {

                    "Authorization": `Bearer ${token}`,
                }
            });
           
            return response.data;  // Return the data from the API
        } catch (error) {
            console.log(error)
            // Handling error and returning the error message
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


const DashBoardSlice = createSlice({
    name: "DashBoard",
    initialState: {
        loading: false,
        totalearnings: null,
        totalproducts:null,
        totalorders:null,
        totalusers:null,
        error: null,
        show:true
        
    },
    reducers: {
        showing: (state) => {
            state.show = false;
          
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalRevanue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalRevanue.fulfilled, (state, action) => {
                state.loading = false;
                state.totalearnings = action.payload.totalrevanue;
                state.totalorders=action.payload.orderlen
                state.totalproducts=action.payload.productlen
                state.totalusers=action.payload.userlength
            })
            .addCase(totalRevanue.rejected, (state, action) => {
                state.loading = false;
                
                state.error = action.payload;
            })
    },
});



export default DashBoardSlice.reducer;
export const { showing } = DashBoardSlice.actions