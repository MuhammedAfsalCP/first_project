import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-[100vw] bg-[#f2c1bd] h-auto py-10 mt-8'>
  <div className='max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
    {/* Company Info Section */}
    <div className='flex flex-col space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Pet E-Commerce</h2>
      <p className='text-gray-600'>Your one-stop shop for all dog and cat food. We care about your pets as much as you do!</p>
    </div>

    {/* Quick Links Section */}
    <div className='flex flex-col space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Quick Links</h2>
      <ul className='space-y-2'>
        <li><Link to='/' className='text-gray-700 hover:text-gray-500'>Home</Link></li>
        <li><Link  className='text-gray-700 hover:text-gray-500'>Shop</Link></li>
        <li><Link  className='text-gray-700 hover:text-gray-500'>About Us</Link></li>
        <li><Link  className='text-gray-700 hover:text-gray-500'>Contact</Link></li>
      </ul>
    </div>

    {/* Contact Section */}
    <div className='flex flex-col space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Contact Us</h2>
      <ul className='space-y-2'>
        <li className='text-gray-600'>123 Pet Street, Kuttippuram</li>
        <li className='text-gray-600'>Email: support@petshop.com</li>
        <li className='text-gray-600'>Phone: +91 9876543210</li>
      </ul>
      {/* Social Media Icons */}
      <div className='flex space-x-4'>
        <a href='#' className='text-gray-700 hover:text-gray-500'>
          <box-icon type='logo' name='facebook'></box-icon>
        </a>
        <a href='#' className='text-gray-700 hover:text-gray-500'>
          <box-icon type='logo' name='twitter'></box-icon>
        </a>
        <a href='#' className='text-gray-700 hover:text-gray-500'>
          <box-icon type='logo' name='instagram'></box-icon>
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Footer Section */}
  <div className='border-t border-gray-300 mt-8 pt-6'>
    <p className='text-center text-gray-600'>&copy; 2024 Pet E-Commerce. All Rights Reserved.</p>
  </div>
</footer>

  )
}

export default Footer
