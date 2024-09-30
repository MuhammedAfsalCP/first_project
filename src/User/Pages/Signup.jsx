import axios from 'axios';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Pascomponent } from '../../App';
 // Assuming this context is needed

const Signup = () => {
  const { setProducts } = useContext(Pascomponent); // Access context if necessary
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').trim(),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { name, email, password } = values;

      try {
        const response = await axios.get('http://localhost:3000/register-details');
        const check = response.data.find((user) => user.email === email);

        if (check) {
          alert('Email Already Exists'); // You can replace this with your toast notification
        } else {
          await axios.post('http://localhost:3000/register-details', {
            name,
            email,
            password,
            cart: [],
            totalamount: 0,
            totalQuantity: 0,
            orderditems: [],
            Block: false,
          });
          alert('Successfully Registered'); // Replace with toast notification
          navigate('/Login');
          resetForm(); // Reset the form after successful registration
        }
      } catch (error) {
        alert('Something went wrong. Please try again.'); // Replace with toast notification
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#fcf8ef] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg">
          <h1 className="font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6">Create Account</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
            
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Name</label>
              <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Enter Name" />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Enter Your Email</label>
              <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Enter E-mail" />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Create a Password</label>
              <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Enter Password" />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg lg:text-xl font-semibold">Confirm Your Password</label>
              <input type="password" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} className="mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" placeholder="Re-Enter Password" />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]" >Submit</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#fcf8ef] font-bold text-center py-2">
        <Link to="/Login" className="text-blue-500 hover:underline">Already have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;
