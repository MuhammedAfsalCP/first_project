import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL; // Replace with your actual API base URL

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        `${apiUrl}/cart/cartadd/`,
        { product: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the correct response structure contains a 'message' field
      console.log(response.data.messege)
      toast.success(`${response.data.messege}`, {
        autoClose: 5000,
      });
      console.log('Toast should appear now!'); // Debugging line
      

      return response.data; // Success response
    } catch (error) {
      // Check if error response exists and use a more informative message
      const errorMessage = error.response?.data?.message || "An error occurred while adding to cart.";
      toast.error(errorMessage, {
        autoClose: 5000,
      });
      console.error(error.response);  // Log the full error for debugging
      return rejectWithValue(errorMessage); // Reject with an informative message
    }
  }
);


// Async thunk for updating the quantity of a cart item
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity", // Corrected name
  async ({ productId, method }, { rejectWithValue, getState }) => {
  
    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.put(
        `${apiUrl}/cart/cartspesific/${productId}/`,
        { method },
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
export const cartproductdelete = createAsyncThunk(
  "cart/cartproductdelete", // Corrected name
  async ( productId , { rejectWithValue, getState }) => {
    
    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.delete(
        `${apiUrl}/cart/cartspesific/${productId}/`,
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

// Async thunk for getting cart details
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue, getState }) => {
    
    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get(
        `${apiUrl}/cart/cartadd/`,
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: null, // Changed from null to an empty array to avoid potential issues with null references
    loading: false,
    carterror: null,
    cartData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.carterror = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Instead of replacing, you can append the new item to existing items
        state.items=action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.carterror = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.carterror = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.carterror = action.payload;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.carterror = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the specific cart item in cartData
        
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.carterror = action.payload;
      })
      .addCase(cartproductdelete.pending, (state) => {
        state.loading = true;
        state.carterror = null;
      })
      .addCase(cartproductdelete.fulfilled, (state, action) => {
        state.loading = false;
        // Instead of replacing, you can append the new item to existing items
        state.items=null
      })
      .addCase(cartproductdelete.rejected, (state, action) => {
        state.loading = false;
        state.carterror = action.payload;
      })
  },
});

export default cartSlice.reducer;
