import React from 'react';
import Footer from '../Components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Pascomponent } from '../../App';
import * as Yup from 'yup';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const { setVerifyname, setVerifyemail, setVerifypass, setVerifyconfirm } = useContext(Pascomponent);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    pass: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .matches(/^\S*$/, 'Password should not contain spaces')
      .required('Password is required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('pass'), null], 'Passwords must match')
      .required('Confirm your password')
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { name, email, pass, confirm } = values;
      const response = await axios.get('http://localhost:3000/register-details');
      const check = response.data.find((x) => x.email === email);

      if (!check) {
        // Register user if validation passes
        await axios.post('http://localhost:3000/register-details', {
          name,
          email,
          password: pass,
          cart: [],
          totalamount: 0,
          totalQuantity: 0,
          orderditems: [],
          Block: false
        });

        navigate('/Login');
        resetForm(); // Reset form fields after successful submission
        toast.success('Successfully Registered');
      } else {
        toast.error('Email Already Existing');
      }
    } catch (error) {
      toast.error('Registration Failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8ef] flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg">
          <h1 className="font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6">Create Account</h1>
          
          {/* Formik Form */}
          <Formik
            initialValues={{
              name: '',
              email: '',
              pass: '',
              confirm: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-6">
                {/* Name Input */}
                <div className="flex flex-col">
                  <label className="text-base md:text-lg lg:text-xl font-semibold">
                    Enter Your Name
                    <ErrorMessage name="name" component="div" className="text-red-500" />
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col">
                  <label className="text-base md:text-lg lg:text-xl font-semibold">
                    Enter Your Email
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </label>
                  <Field
                    id="email"
                    name="email"
                    className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col">
                  <label className="text-base md:text-lg lg:text-xl font-semibold">
                    Create a Password
                    <ErrorMessage name="pass" component="div" className="text-red-500" />
                  </label>
                  <Field
                    id="password"
                    name="pass"
                    className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col">
                  <label className="text-base md:text-lg lg:text-xl font-semibold">
                    Confirm Your Password
                    <ErrorMessage name="confirm" component="div" className="text-red-500" />
                  </label>
                  <Field
                    id="confirm"
                    name="confirm"
                    className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    type="password"
                    placeholder="Re-Enter Password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  className="bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#fcf8ef] font-bold text-center py-2">
        <Link to="/Login" className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
