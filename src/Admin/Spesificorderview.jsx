import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpesificorder, getOrderid, updateorder } from '../Redex/OrderSlice';
import { useLocation } from 'react-router-dom';


const Spesificorderview = () => {
  const dispatch=useDispatch()
const location = useLocation();
const { spesificorder } = useSelector((state) => state.Order);
  const orderId = location.state || null;
  
  useEffect(()=>{
    dispatch(fetchSpesificorder(orderId))
  },[])
  const update=()=>{
    
    dispatch(updateorder({orderId:orderId,method:"Delivered"}))

    setTimeout(() => {
        dispatch(fetchSpesificorder(orderId))
    }, 100);
  }
  console.log(spesificorder)
  return (
    <div className="w-full h-full p-6 flex flex-col">
  <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
    <h2 className="text-2xl font-bold mb-4">Order Details</h2>

    {/* Order ID and Date */}
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold">Order ID</h3>
        <p>{spesificorder?.order_id}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Date</h3>
        <p>{new Date(spesificorder?.created_at).toLocaleDateString()}</p>
      </div>
    </div>

    {/* Order Items */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Order Items</h3>
      {spesificorder?.orderitems.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center bg-gray-100 p-4 rounded-lg mb-4">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <img
              src={item.product.Image}
              alt={item.product.Name}
              className="w-30 h-40 object-cover rounded-md"
            />
          </div>
          <div className="w-full md:w-3/4 md:pl-6">
            <h4 className="text-lg font-bold">{item.product.Name}</h4>
            <p className="text-md text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-md text-gray-600">Price: ₹{item.product.Price}</p>
            <p className="text-md text-gray-600">Subtotal: ₹{item.item_subtotal}</p>
            <p className="text-md text-gray-600">Status: {item.status}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Financial Summary */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold">Financial Summary</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-md text-gray-600">Total Price: ₹{spesificorder?.total_price}</p>
        </div>
      </div>
    </div>

    {/* Address Section */}
    <div>
      <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
      <p className="text-md text-gray-700">{spesificorder?.address?.join(", ")}</p>
    </div>

    {/* Delivered Button */}
    <button
      className={`px-4 py-2 mt-4 rounded-lg text-white ${
        spesificorder?.orderitems[0]?.status === 'Cancelled' || spesificorder?.orderitems[0]?.status === 'Delivered' ? 'hidden' : 'bg-green-500 self-end'
      }`}
      onClick={()=>update()}
    >
      Delivered
    </button>
  </div>
</div>

  

  
  );
};

export default Spesificorderview;
