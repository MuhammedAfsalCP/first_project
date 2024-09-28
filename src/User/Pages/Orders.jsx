import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../../App'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const userid = localStorage.getItem('user_Id')
    useEffect(() => {
        const fetchProducts = async () =>{
        try {
            const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
            const userData = response.data;
            if (userData.orderditems && userData.orderditems.length > 0) {
                setOrders(userData.orderditems)
            }
        }
        catch (error){
            console.log("Error in fetching order",error);
            
        }}
        fetchProducts();
  },[userid])

  if(orders.length == 0){
    return(
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          No Orders Yet
        </h1>
        <p className="text-gray-500">
          Looks like you haven't placed any orders yet. Start shopping to fill your cart!
        </p>
      </div>
    )
  }

    return (
        <div>
            <Navbar />
            <div className="pt-[80px] pb-[60px] min-h-[70vh] w-full bg-[#fcf8ef] flex flex-col items-center">
                <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-xl">
                    {orders.map((x, userIndex) => (
                        <div key={userIndex} className="border-b border-gray-200 pb-4 mb-4">
                            {x.items.map((pro, proIndex) => (
                                        <div key={proIndex} className="flex flex-col md:flex-row bg-white p-6 shadow-md rounded-lg mb-6 border border-gray-200">
                                            {/* Image Section */}
                                            <div className="w-full md:w-1/3 mb-4 md:mb-0 h-[150px]">
                                                <img
                                                    src={pro.image}
                                                    alt={pro.name}
                                                    className="object-contain w-full h-full rounded-md shadow-sm"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="w-full md:w-2/3 flex flex-col justify-between md:pl-6">
                                                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                                                    {pro.name}
                                                </h1>
                                                <div className="text-gray-600">
                                                    <h2 className="text-lg font-semibold">Total Quantity: {pro.quantity}</h2>
                                                    <h2 className="text-lg">Total Price: {pro.total_price}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    ))}

                    {/* Last Section */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-500">Thank you for your purchase!</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Orders
