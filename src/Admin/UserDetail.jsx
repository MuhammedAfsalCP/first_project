import React, { useContext, useEffect, useState } from 'react'; 
import { Pascomponent } from '../App'; 
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpesificuser } from '../Redex/UserSlice';

const UserDetail = () => {
  // cotaxt access
  const {spesificuser,token} = useSelector((state) => state.User);
const location = useLocation();
  const userId = location.state || null;
  
  const dispatch=useDispatch()
  useEffect(()=>{
    if(userId){
      dispatch(fetchSpesificuser({userId,token}))
    }
  },[])


  return (
    <div className="w-full h-full p-6 space-y-8">
  {/* User Overview Section */}
  <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-6 rounded-lg shadow-lg">
    {/* Profile Image */}
    <div className="flex items-center">
      <img
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="User Avatar"
        className="rounded-full w-24 h-24 mr-6"
      />
      {/* User Info */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {spesificuser?.username || "Guest User"}
        </h1>
        <h2 className="text-md text-gray-600">
          {spesificuser?.email || "Email not available"}
        </h2>
      </div>
    </div>
    {/* Summary */}
    <div className="mt-6 lg:mt-0 text-center">
      <h2 className="text-lg font-bold">
        Total Orders: {spesificuser?.orders?.length || 0}
      </h2>
      <h2 className="text-lg font-bold">
        Cart Items: {spesificuser?.cart?.cartitems?.length || 0}
      </h2>
    </div>
  </div>

  {/* Orders & Cart Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Orders */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      {spesificuser?.orders?.length ? (
        spesificuser.orders.map((order, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-bold">Order ID: {order.order_id}</h3>
            <p>Status: {order.status}</p>
            <p>
              Items: {order.orderitems.length} | Total: ₹
              {order.total_price}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders yet.</p>
      )}
    </div>

    {/* Cart */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {spesificuser?.cart?.cartitems?.length ? (
        spesificuser.cart.cartitems.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-4"
          >
            <img
              src={item.product_image}
              alt="Product"
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-bold">{item.product_name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.product_price}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  </div>
</div>


   
  );
}

export default UserDetail;
