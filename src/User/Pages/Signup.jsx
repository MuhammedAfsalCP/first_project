import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, verifyOtp } from "../../Redex/UserSlice";
import Swal from "sweetalert2"; // SweetAlert2 for notifications

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error, verifyotp, otperror } = useSelector((state) => state.User);
  console.log(otperror)
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otpSent) {
      // Verify OTP if sent

      dispatch(verifyOtp({ otp, userInfo: formData }));
    } else {
      // Dispatch the form data to Redux to create an account
      dispatch(createAccount(formData));
      console.log("Form Data Submitted:", formData);
    }
  };

  useEffect(() => {
    if (userInfo?.message?.length > 0) {
      setOtpSent(true);

      Swal.fire({
        title: "OTP Sent!",
        text: "The OTP has been sent to your registered email. Please check and enter it below.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000, // Optional: Auto close after 3 seconds
        timerProgressBar: true,
      });

      // OTP has been sent
    }
  }, [userInfo]);

  useEffect(() => {
    if (otperror) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: otperror.message || 'An error occurred!',
      });
    }
  }, [otperror]);

  useEffect(() => {
    if (verifyotp) {
      Swal.fire({
        icon: 'success',
        title: 'OTP verified successfully!',
        text: 'You have been successfully verified.',
      }).then(() => {
        navigate("/Login");
      });
    }
  }, [verifyotp, navigate]);



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Main Container */}
  <div className="flex-grow flex items-center justify-center p-5">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
        <h1 className="text-3xl font-extrabold mb-2">Create Your Account</h1>
        <p className="text-sm font-medium">Join us and explore the best deals on pet food!</p>
      </div>

      {/* Form Section */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-1">User Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
            {error && error.username?.length > 0 && <p className="text-sm text-red-500 mt-1">{error.username[0]}</p>}
          </div>

          {/* Name Fields */}
          <div className="flex gap-4">
            {/* First Name */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {error && error.email?.length > 0 && <p className="text-sm text-red-500 mt-1">{error.email[0]}</p>}
          </div>

          {/* Password Fields */}
          <div className="flex gap-4">
            {/* Password */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Create a password"
              />
              {error && error.password?.length > 0 && <p className="text-sm text-red-500 mt-1">{error.password[0]}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="password2"
                onChange={handleChange}
                value={formData.password2}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Re-enter your password"
              />
              {error && error.password2?.length > 0 && <p className="text-sm text-red-500 mt-1">{error.password2[0]}</p>}
            </div>
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <label className="block text-sm font-semibold mb-1">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                maxLength="6"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            {loading ? "Processing..." : otpSent ? "Verify OTP" : "Register"}
          </button>
        </form>
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <div className="py-4 text-center text-sm text-gray-600">
    Already have an account?{' '}
    <Link to="/Login" className="text-indigo-600 hover:underline">Login here</Link>
  </div>
</div>


  );
};

export default Signup;
