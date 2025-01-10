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
    <div className="min-h-screen bg-[#fcf8ef] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg">
          <h1 className="font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6">
            Create Account
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your User Name</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter First Name"
              />
              {error && error.username?.length > 0 && <p style={{ color: 'red' }}>{error.username[0]}</p>}

            </div>
            {/* First Name Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your First Name</label>
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter First Name"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Last Name</label>
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                required
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter Last Name"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter E-mail"
              />
              {error && error.email?.length > 0 && <p style={{ color: 'red' }}>{error.email[0]}</p>}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Create a Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter Password"
              />
              {error && error.password?.length > 0 && <p style={{ color: 'red' }}>{error.password[0]}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Confirm Your Password</label>
              <input
                type="password"
                name="password2"
                onChange={handleChange}
                value={formData.password2}
                className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Re-Enter Password"
              />
              {error && error.password2?.length > 0 && <p style={{ color: 'red' }}>{error.password2[0]}</p>}
              {error && error.Error?.length > 0 && <p style={{ color: 'red' }}>{error.Error}</p>}
            </div>

            {otpSent && (
              <div className="flex flex-col">
                <label className="text-base md:text-lg lg:text-xl font-semibold">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength="6"
                  className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button className="bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]" type="submit" disabled={loading}>
              {loading ? "Registering..." : otpSent ? "Verify OTP" : "Register"}
            </button>

          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#fcf8ef] font-bold text-center py-2">
        <Link to="/Login" className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
