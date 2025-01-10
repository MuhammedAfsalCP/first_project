import React, { useEffect, useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { fetchUserDetails, logout } from '../Redex/UserSlice'
import DashBoard from './DashBoard'
import { showing } from '../Redex/DashBoardSlice'

const AdminPanel = () => {
  const dispatch = useDispatch()
  const {token } = useSelector((state) => state.User);
    const {show} = useSelector((state) => state.DashBoard);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout())  // Dispatch the logout action to clear user data
        toast.success("Successfully Logout") // Show success message
        // Navigate to homepage (use react-router navigate if needed)
      }
    })
  }
  useEffect(() => {
      if (token) {
        // Fetch user details when token is available
        dispatch(fetchUserDetails(token));
        
  
      } else {
        console.log("No token found. Please log in.");
      }
    }, [token, dispatch]);

  return (
    <div className="flex flex-wrap">
      {/* Header */}
      <div className="w-full h-[10vh] flex items-center justify-between bg-[#007BFF] px-4">
        <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-[#FF5733] text-white font-semibold py-2 px-4 rounded hover:bg-[#C0392B] transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div className="bg-[#2C3E50] w-[20%] h-[90vh] flex flex-col">
        <ul className="flex flex-col">
        <Link onClick={()=>dispatch(showing())} to={'Dashboard'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">DashBoard</li>
          </Link>
          <Link onClick={()=>dispatch(showing())} to={'Addproduct'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Add Products</li>
          </Link>
          <Link onClick={()=>dispatch(showing())} to={'AllProducts'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">All Products</li>
          </Link>
          <Link onClick={()=>dispatch(showing())} to={'EditProducts'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Edit Products</li>
          </Link>
          <Link onClick={()=>dispatch(showing())} to={'Users'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Users</li>
          </Link>
          <Link onClick={()=>dispatch(showing())} to={'allorders'}>
            <li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">All Orders</li>
          </Link>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#ECF0F1] w-[80%] h-[90vh] overflow-scroll p-6">
      {show?<DashBoard/>:<Outlet/>}
        {/* Nested content will be displayed here */}
      </div>
    </div>
  )
}

export default AdminPanel
