import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { cartproductdelete, getCart, updateQuantity } from "../../Redex/CartSlice";
import { useNavigate } from "react-router-dom";

const Addtocart = () => {
  const { cartData } = useSelector((state) => state.Cart);
   const { login, token } = useSelector((state) => state.User);
  const dispatch = useDispatch();
const navigate=useNavigate()

  useEffect(() => {
    // Fetch cart data when the component loads
    dispatch(getCart());
  }, []);
useEffect(() => {
    if (!token) {
      // Fetch user details when token is available
      navigate('/')

    }
  }, [token, dispatch]);
  // Safely extract data from cartData
  const cartItems = cartData?.[0]?.cartitems || [];
  const totalPrice = cartData?.[0]?.total_price || 0;

  const updatequantity = (itemid, method) => {
    if (method == 'increase') {
      if (itemid) {
        dispatch(updateQuantity({ productId: itemid, method: 'increase' }));
        setTimeout(() => {
          dispatch(getCart())
        }, 100);
      } else {
        console.error("Item is undefined or missing an id");
      }
    } else {
      if (itemid) {
        dispatch(updateQuantity({ productId: itemid, method: 'decrease' }));
        setTimeout(() => {
          dispatch(getCart())
        }, 100);
      } else {
        console.error("Item is undefined or missing an id");
      }
    }
  }
  const itemdeletecart = (itemId) => {
    dispatch(cartproductdelete(itemId))
    setTimeout(() => {
      dispatch(getCart())
    }, 100);
  }

  return (
    <div>
      <Navbar />
      <div className="pt-[80px] pb-[60px] min-h-[70vh] w-full bg-[#fcf8ef] flex flex-col items-center">
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
          onClick={()=>navigate('/')}
        >
          Back
        </button>
        <div className="w-full max-w-screen-lg bg-white p-6 rounded-lg shadow-lg">
          {/* Render Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-4 px-2"
              >
                {/* Image Section */}
                <div className="w-full md:w-[20%] flex justify-center">
                  <img
                    className="object-contain w-full h-32 md:h-40 rounded-lg shadow-sm"
                    src={item.product_image}
                    alt={item.product_name}
                  />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Product Info */}
                  <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
                    <h1 className="text-lg font-semibold text-gray-800">
                      {item.product_name}
                    </h1>

                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
                      onClick={() => updatequantity(item.id, 'increase')
                      }
                    >
                      <box-icon name="plus" />
                    </button>

                    <h1 className="text-lg">{item.quantity}</h1>
                    <button
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
                      onClick={() => updatequantity(item.id, 'decrease')
                      }
                    >
                      <box-icon name="minus" />
                    </button>
                  </div>

                  {/* Price and Delete */}
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">
                      ${item.item_subtotal}
                    </h1>
                    <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition duration-200" onClick={() => itemdeletecart(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              Your cart is empty. Start shopping now!
            </p>
          )}

          {/* Total Price Section */}
          {cartItems.length > 0 && (
            <div className="w-full mt-6 flex flex-col md:flex-row justify-end items-center">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-lg font-semibold text-gray-800">
                  Total Amount: ${totalPrice}
                </div>
                <button className="w-full md:w-[200px] h-[60px] bg-blue-600 text-white rounded mt-4 md:mt-0 hover:bg-blue-700 transition duration-200" onClick={()=>navigate('/Payment')}>
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Addtocart;
