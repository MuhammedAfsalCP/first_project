import axios from 'axios';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Pascomponent } from '../../App';
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { setUserid, setCartview, setTotalquantity, setTotalamount, setShowname, setAdmin, setUser } = useContext(Pascomponent);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      loginmail: '',
      loginpass: '',
    },
    validationSchema: Yup.object({
      loginmail: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      loginpass: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { loginmail, loginpass } = values;

      try {
        const response = await axios.get("http://localhost:3000/register-details"); // Fetch user data
        const user = response.data.find(
          (x) => x.email === loginmail && x.password === loginpass
        ); // Login validation

        if (user) {
          // Store user data in localStorage
          localStorage.setItem("user_Id", user.id);
          localStorage.setItem("user_name", user.name);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.removeItem('cart'); // Clear cart in localStorage

          // Fetch user's cart and details
          const userResponse = await axios.get(`http://localhost:3000/register-details/${user.id}`);
          const userCart = userResponse.data.cart; // Fetch user's cart
          const totalQuantity = userResponse.data.totalQuantity; // Total quantity
          const showName = userResponse.data.name; // User's name
          const totalAmount = userResponse.data.totalamount; // Total amount

          sessionStorage.setItem('cart', JSON.stringify(userCart)); // Store cart in sessionStorage

          // Store user data in state
          setUserid(user.id);
          setCartview(userCart);
          setTotalquantity(totalQuantity);
          setTotalamount(totalAmount);
          setShowname(showName);

          if (user.admin === "true") {
            setAdmin(true); // Set admin status
            toast.success("Admin logged in successfully");
          } else {
            setAdmin(false);
            setUser(true); // User verified
            toast.success("Login Successful");
          }
          navigate('/'); // Navigate to homepage
        } else {
          toast.error("Invalid Email or Password"); // Show error message
        }
      } catch (error) {
        console.error('Login error:', error); // Log any errors
        toast.error("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#fcf8ef] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg">
          <h1 className="font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6">
            Sign In
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Email</label>
              <input type="email" name="loginmail" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.loginmail} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Enter E-mail" />
              {formik.touched.loginmail && formik.errors.loginmail ? (
                <div className="text-red-500 text-sm">{formik.errors.loginmail}</div>
              ) : null}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Password</label>
              <input type="password" name="loginpass" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.loginpass} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Enter Password" />
              {formik.touched.loginpass && formik.errors.loginpass ? (
                <div className="text-red-500 text-sm">{formik.errors.loginpass}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]" >Submit</button>
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
