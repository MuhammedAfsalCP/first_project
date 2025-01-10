import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
export const createAccount = createAsyncThunk("auth/register",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/users/register/`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data; // API response
    } catch (error) {

      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ otp, userInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/users/otpverification/`, { otp, ...userInfo });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const LoginCheck = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/users/login/`, formData);
      return response.data;
    } catch (error) {
      console.log("hi")
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetails = createAsyncThunk('user/fetchDetails', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/users/userdetailsview/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user details
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const adminshowuserdetails = createAsyncThunk('user/adminshowuserdetails', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/users/userdetails/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user details
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

export const updateuser = createAsyncThunk(
  "cart/updateuser", // Corrected name
  async ({ userId, method }, { rejectWithValue, getState }) => {

    try {
      const { token } = getState().User; // Accessing token from the Redux store
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.put(
        `${apiUrl}/users/edituser/${userId}/`,
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

export const fetchSpesificuser = createAsyncThunk(
  "products/fetchSpesificuser",
  async ({userId,token}, { rejectWithValue }) => {
    try {
      // Sending GET request to the API with category as part of the URL
      const response = await axios.get(`${apiUrl}/users/spesificalldetails/${userId}/`, {
        headers: { "Content-Type": "application/json",
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


const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  verifyotp: null,
  otperror: null,
  login: null,
  token: localStorage.getItem('token') || null,
  users: null,
  spesificuser: null
}

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.login = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyotp = action.payload; // Set the user info or success message
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otperror = action.payload; // Set error message from API
      })
      .addCase(LoginCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.login = action.payload.userdetail;
        localStorage.setItem('token', action.payload.access);
      })
      .addCase(LoginCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload.userdetail;

      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminshowuserdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminshowuserdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;

      })
      .addCase(adminshowuserdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSpesificuser.pending, (state) => {
        state.loading = true;  
      })
      .addCase(fetchSpesificuser.fulfilled, (state, action) => {
        state.loading = false;  
        state.spesificuser = action.payload; 
        state.error = null; 
      })
      .addCase(fetchSpesificuser.rejected, (state, action) => {
        state.loading = false;  
        state.error = action.payload;  
      })

  }
})

export default UserSlice.reducer
export const { logout } = UserSlice.actions