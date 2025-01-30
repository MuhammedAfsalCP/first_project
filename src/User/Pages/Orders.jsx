import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getOrder, updateStatus } from "../../Redex/OrderSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const { orderdData } = useSelector((state) => state.Order);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch orders when the component loads
        dispatch(getOrder());
    }, []);

    // Handle order cancellation
    const handleCancelOrder = (orderId, method) => {

        // Logic for cancelling the order
        dispatch(updateStatus({ orderid: orderId, method: 'Cancelled' }))
        setTimeout(() => {
            dispatch(getOrder());
        }, 100);
        
        // Dispatch an action to cancel the order (to be implemented in your Redux slice)
        // dispatch(cancelOrder(orderId));
    };
const navigate=useNavigate()
    if (!orderdData || orderdData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                    No Orders Yet
                </h1>
                <p className="text-gray-500">
                    Looks like you haven't placed any orders yet. Start shopping to fill your cart!
                </p>
            </div>
        );
    }

    return (
        <div>
    <Navbar />
    <div className="pt-[80px] pb-[60px] min-h-[70vh] w-full bg-[#f0f4f8] flex flex-col items-center">
    <div className="w-full flex justify-start px-4">
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
        onClick={() => navigate('/')}
      >
        Back
      </button>
    </div>
        <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
            {orderdData.map((order, index) => (
                <div
                    key={index}
                    className="border border-gray-200 p-6 rounded-lg mb-6 shadow-md bg-[#f9f9f9]"
                >
                    {/* Order Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Order ID: {order.order_id}
                        </h2>
                        <p className="text-gray-600">
                            Ordered On: {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Delivery Address</h3>
                        <ul className="pl-6 text-gray-600">
                            <li>Name : {order.address[0]}</li>
                            <li>E-mail : {order.address[1]}</li>
                            <li>Address : {order.address[2]}</li>
                        </ul>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Products
                        </h3>
                        {order.orderitems.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
                            >
                                {/* Product Image */}
                                <div className="w-full md:w-1/4 h-[150px] mb-4 md:mb-0">
                                    <img
                                        src={item.product.Image &&
                                            typeof item.product.Image === "string" &&
                                            item.product.Image.startsWith("https://petfoood.s3.amazonaws.com/https%3A")
                                              ? item.product.Image.replace(
                                                  "https://petfoood.s3.amazonaws.com/https%3A",
                                                  "https://"
                                                )
                                              : item.product.Image}
                                        alt={item.product.Name}
                                        className="object-contain w-full h-full rounded-md"
                                    />
                                </div>
                                {/* Product Details */}
                                <div className="w-full md:w-3/4 md:pl-6">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {item.product.Name}
                                    </h4>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">Price: ₹{item.product.Price}</p>
                                    <p className="text-gray-600">
                                        Subtotal: ₹{item.item_subtotal}
                                    </p>
                                    <p className="text-gray-600">Status: {item.status}</p>
                                    <div className="mt-4 text-right">
                                        {item?.status === "Shipping" ? (
                                            <button
                                                onClick={() => handleCancelOrder(item.id, 'Cancelled')}
                                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                                            >
                                                Cancel Order
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-4 text-right">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Total Price: ₹{order.total_price}
                        </h3>
                    </div>

                    {/* Cancel Order Button */}
                </div>
            ))}

            {/* Thank You Message */}
            <div className="mt-6 text-center">
                <p className="text-gray-500">Thank you for shopping with us!</p>
            </div>
        </div>
    </div>
    <Footer />
</div>

    );
};

export default Orders;
