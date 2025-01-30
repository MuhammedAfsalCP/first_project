import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderid } from '../Redex/OrderSlice';
import { useNavigate } from 'react-router-dom';


const AllOrders = () => {
  const dispatch=useDispatch()
const { orderid } = useSelector((state) => state.Order);
    useEffect(()=>{
        dispatch(getOrderid())
    },[])
    const navigate=useNavigate()
console.log(orderid)
const  handleViewClick=(orderId)=>{
    navigate('/spesificorder',{ state: orderId })
}
  return (
    <div className="w-full h-full p-6">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Order List</h2>

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-gray-700">Order ID</th>
            <th className="py-2 px-4 text-left text-gray-700">Date</th>
            <th className="py-2 px-4 text-left text-gray-700">Total Price</th>
            <th className="py-2 px-4 text-left text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderid?.map((order, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="py-3 px-4">{order.order_id}</td>
              <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4">₹{order.total_price}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleViewClick(order.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  
  );
};

export default AllOrders;
