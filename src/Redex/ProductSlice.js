import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page, url }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url || `${apiUrl}/products/productdetails/`, {
        params: page ? { page } : {}, // Use `page` as a query parameter only if provided
      });
      console.log(response.data)
      return response.data; // Return the response data to the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);



export const postProducts = createAsyncThunk(
  "products/productadd",  // Renamed action for clarity
  async (formdata, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        `${apiUrl}/products/productdetails/`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;  // Returning the data from the API response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
  }
);




export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      // Sending GET request to the API with category as part of the URL
      const response = await axios.get(`${apiUrl}/products/productcategory/${category}/`, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;  // Return the data from the API
    } catch (error) {
      // Handling error and returning the error message
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchSpesificProduct = createAsyncThunk(
  "products/fetchspesificproduct",
  async (productid, { rejectWithValue }) => {
    try {
      // Sending GET request to the API with category as part of the URL
      const response = await axios.get(`${apiUrl}/products/productdetails/${productid}/`, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;  // Return the data from the API
    } catch (error) {
      // Handling error and returning the error message
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (productid, { rejectWithValue, getState }) => {
    try {
      // Access the token from the Redux store
      const { token } = getState().User;
      console.log(token)// Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      // Sending DELETE request to the API with the token in the headers
      const response = await axios.delete(`${apiUrl}/products/productdetails/${productid}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Add the token here
        },
      });
      return productid
      // Check if the response status is 200 (OK)

    } catch (error) {
      // Log the full error object for debugging
      console.error("Error deleting product:", error);

      // Return more detailed error information
      const errorMessage = error.response?.data?.detail || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async ({ formData, productid }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().User;
      console.log("Token from Redux state:", token);
      // Assuming token is in the User state
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.put(`${apiUrl}/products/productdetails/${productid}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMessage = error.response?.data?.detail || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);


export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (productname, { rejectWithValue }) => {
    try {
  
      const response = await axios.get(`${apiUrl}/products/productfilter/${productname}/`, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;  // Return the data from the API
    } catch (error) {
      // Handling error and returning the error message
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


export const offerProduct = createAsyncThunk(
  "products/offerProduct",
  async (_, { rejectWithValue }) => {
    try {
  
      const response = await axios.get(`${apiUrl}/products/offerproduct/`, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;  // Return the data from the API
    } catch (error) {
      console.log(error.response)
      // Handling error and returning the error message
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


const initialState = {
  products: [],  // Default state for products
  loading: false,
  selectedProduct: null,
  error: null,
  totalCount:null,
  next:null,
  previous:null,
  search:null,
  offerproduct:null

};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchadd:(state,action)=>{
      state.search=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = false;  // Set loading to true when the API request starts
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false once the request is completed
        state.products = action.payload.results;  // Storing the fetched products in state
        state.error = null;
        state.totalCount = action.payload.count; // Total products
        state.next = action.payload.next; // Next page URL
        state.previous = action.payload.previous; // Clear any previous errors
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;  // Set loading to false if the request fails
        state.error = action.payload;  // Store the error message
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;  // Set loading to true when the API request starts
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request is successful
        state.products = action.payload;  // Store the fetched products in state
        state.error = null;  // Clear any previous errors
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;  // Set loading to false when the request fails
        state.error = action.payload;  // Store the error message
      })
      .addCase(fetchSpesificProduct.fulfilled, (state, action) => {
       
        state.loading = false;
        state.selectedProduct = action.payload; // Assign the API response
        state.error = null;
      })
      .addCase(fetchSpesificProduct.rejected, (state, action) => {
        console.log("Reducer: Error occurred:", action.payload); // Log the error
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postProducts.pending, (state) => {
        state.loading = true;  // Set loading to true when the API request starts
      })
      .addCase(postProducts.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request completes
        console.log("Product posted successfully:", action.payload);
        state.error = null;  // Clear any previous errors
        // Optionally, you can add the new product to the state here
        state.products.push(action.payload); // Assuming you want to add the posted product to the list
      })
      .addCase(postProducts.rejected, (state, action) => {
        state.loading = false;  // Set loading to false if the request fails
        state.error = action.payload;  // Store the error message
        console.error("Error posting product:", action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;  // Set loading to true when the delete request starts
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request completes
        state.products = state.products.filter(product => product.id !== action.payload);  // Remove the deleted product from the list
        state.error = null;  // Clear any previous errors
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;  // Set loading to false if the request fails
        state.error = action.payload;  // Store the error message
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log("Reducer: Updating selectedProduct with payload:", action.payload); // Log the payload
        state.loading = false;
        state.selectedProduct = action.payload; // Assign the API response
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.log("Reducer: Error occurred:", action.payload); // Log the error
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = false;  // Set loading to true when the API request starts
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request is successful
        state.products = action.payload;  // Store the fetched products in state
        state.error = null; 
        state.search=null // Clear any previous errors
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;  // Set loading to false when the request fails
        state.error = action.payload;  // Store the error message
      })
      .addCase(offerProduct.pending, (state) => {
        state.loading = false;  // Set loading to true when the API request starts
      })
      .addCase(offerProduct.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request is successful
        state.offerproduct = action.payload;  // Store the fetched products in state
        state.error = null; 
         // Clear any previous errors
      })
      .addCase(offerProduct.rejected, (state, action) => {
        state.loading = false;  // Set loading to false when the request fails
        state.error = action.payload;  // Store the error message
      })




  }
});

export default productSlice.reducer;


export const {searchadd}= productSlice.actions