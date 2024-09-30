import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import { Pascomponent } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setUserid, setCartview, setTotalquantity, setTotalamount, setShowname, setAdmin, setUser } = useContext(Pascomponent);

  // Yup validation schema
  const validationSchema = Yup.object({
    loginmail: Yup.string().email('Invalid email format').required('Email is required'),
    loginpass: Yup.string().required('Password is required')
  });

  // Handle form submission
  const loginSubmit = async (values, { setSubmitting }) => {
    const { loginmail, loginpass } = values;
    setSubmitting(true);
    try {
      const response = await axios.get("http://localhost:3000/register-details"); // Fetch user data
      const check = response.data.find((x) => x.email === loginmail && x.password === loginpass); // Login validation

      if (check && check.admin !== "true") {
        // Store user data in localStorage
        localStorage.setItem("user_Id", check.id);
        localStorage.setItem("user_name", check.name);
        localStorage.setItem('user', JSON.stringify(check));
        localStorage.removeItem('cart'); // Clear cart in localStorage

        const userResponse = await axios.get(`http://localhost:3000/register-details/${check.id}`);
        const userCart = userResponse.data.cart; // Fetch user's cart
        const totquantiy = userResponse.data.totalQuantity; // Total quantity
        const shownamename = userResponse.data.name; // User's name
        const totamount = userResponse.data.totalamount; // Total amount

        sessionStorage.setItem('cart', JSON.stringify(userCart)); // Store cart in sessionStorage

        // Store user data in state
        setUserid(check.id);
        setCartview(userCart);
        setTotalquantity(totquantiy);
        setTotalamount(totamount);
        setShowname(shownamename);

        setAdmin(false);
        setUser(true); // User verified
        toast.success("Login Successfully");
        navigate('/'); // Navigate to homepage
      } else if (check && check.admin === "true") {
        localStorage.setItem('admin', JSON.stringify(check));
        setAdmin(true);
        navigate('/');
      } else {
        toast.error("Invalid Email or Password"); // Show error message
      }
    } catch (error) {
      console.error('Login error:', error); // Log any errors
      toast.error("Login failed");
    }
    setSubmitting(false);
  };

  return (
    <div className='h-screen w-full bg-[#fcf8ef] flex flex-col'>
      {/* Main Content */}
      <div className='flex-grow flex justify-center items-center'>
        <div className='w-full max-w-md bg-white shadow-lg rounded-md p-8'>
          <h1 className='font-sofadi text-3xl text-center mb-6'>Sign In</h1>

          {/* Formik Form */}
          <Formik
            initialValues={{ loginmail: '', loginpass: '' }}
            validationSchema={validationSchema}
            onSubmit={loginSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='space-y-6'>
                {/* Email Input */}
                <div className='flex flex-col'>
                  <label className='font-semibold text-lg mb-2'>Enter Your E-mail</label>
                  <Field
                    name='loginmail'
                    type='email'
                    className='outline-none p-3 bg-transparent border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300'
                    placeholder='Enter your email'
                  />
                  <ErrorMessage name='loginmail' component='div' className='text-red-500' />
                </div>

                {/* Password Input */}
                <div className='flex flex-col'>
                  <label className='font-semibold text-lg mb-2'>Enter Your Password</label>
                  <Field
                    name='loginpass'
                    type='password'
                    className='outline-none p-3 bg-transparent border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300'
                    placeholder='Enter your password'
                  />
                  <ErrorMessage name='loginpass' component='div' className='text-red-500' />
                </div>

                {/* Submit Button */}
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-[#a6c1ee] text-white rounded-md py-2 font-semibold border border-transparent hover:bg-[#87acec] transition-all duration-300'
                  >
                    {isSubmitting ? 'Logging in...' : 'Submit'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer Link */}
      <div className='bg-[#fcf8ef] font-bold text-center py-2'>
        <Link to={'/Signup'} className='text-blue-500 hover:underline'>Don't have an account? Signup here</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
