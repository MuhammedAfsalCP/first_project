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
    <div className="min-h-screen bg-[#fcf8ef] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg">
          <h1 className="font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Username Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter Username"
              />
              {error && error.username?.length > 0 && <p style={{ color: 'red' }}>{error.username[0]}</p>}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter Password"
              />
              {error && error.error?.length > 0 && <p style={{ color: 'red' }}>{error.error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Link */}
      <div className="bg-[#fcf8ef] font-bold text-center py-2">
        <Link to="/Signup" className="text-blue-500 hover:underline">
          Don't have an account? Signup here
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
