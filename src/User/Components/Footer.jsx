import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-10">
  <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Company Info Section */}
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Pet E-Commerce</h2>
      <p className="text-gray-200">
        Your one-stop shop for all dog and cat food. We care about your pets as much as you do!
      </p>
    </div>

    {/* Quick Links Section */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact Section */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <ul className="space-y-2">
        <li>123 Pet Street, Kuttippuram</li>
        <li>Email: <a href="mailto:support@petshop.com" className="hover:underline">support@petshop.com</a></li>
        <li>Phone: <a href="tel:+919876543210" className="hover:underline">+91 9876543210</a></li>
      </ul>
    </div>

    {/* Social Media Section */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
      <div className="flex space-x-4">
        <a href="#" className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-200 transition">
          <box-icon type="logo" name="facebook"></box-icon>
        </a>
        <a href="#" className="bg-white text-blue-400 p-3 rounded-full shadow-lg hover:bg-gray-200 transition">
          <box-icon type="logo" name="twitter"></box-icon>
        </a>
        <a href="#" className="bg-white text-pink-600 p-3 rounded-full shadow-lg hover:bg-gray-200 transition">
          <box-icon type="logo" name="instagram"></box-icon>
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Footer Section */}
  <div className="border-t border-gray-300 mt-8 pt-6">
    <p className="text-center text-gray-200">&copy; 2024 Pet E-Commerce. All Rights Reserved.</p>
  </div>
</footer>


  )
}

export default Footer
