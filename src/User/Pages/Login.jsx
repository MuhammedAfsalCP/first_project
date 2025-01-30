import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';

import { LoginCheck } from "../../Redex/UserSlice";
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

  const { login, loading, error } = useSelector((state) => state.User);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch(); // Correctly using the dispatch hook
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value,error } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    dispatch(LoginCheck(formData)); // Dispatch action correctly
  };

  useEffect(() => {
     // Debugging userInfo
     
     if (login && Object.keys(login).length > 0) {
      navigate('/');
    }
  }, [login]);
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    {/* Main Container */}
    <div className="flex-grow flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-sm font-medium">Login to continue and explore the best deals on pet food!</p>
        </div>
  
        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Enter Your Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Username"
              />
              {error && error.username?.length > 0 && (
                <p className="text-sm text-red-500 mt-1">{error.username[0]}</p>
              )}
            </div>
  
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Enter Your Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Password"
              />
              {error && error.error?.length > 0 && (
                <p className="text-sm text-red-500 mt-1">{error.error}</p>
              )}
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  
    {/* Footer Section */}
    <div className="py-4 text-center text-sm text-gray-600">
      Don't have an account?{' '}
      <Link to="/Signup" className="text-indigo-600 hover:underline">
        Signup here
      </Link>
    </div>
  </div>
  
  );
};

export default Login;
