import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { initiateCheckout, resetPaymentState, verifyPayment } from "../../Redex/PaymentSlice";
import Swal from "sweetalert2";

const PaymentSection = () => {
  const dispatch = useDispatch();

  // Access Redux state using useSelector
  const { loading, paymentDetails, paymentVerified, error } = useSelector(
    (state) => state.Payment
  );
  const { token } = useSelector((state) => state.User);

  // Form state and errors
  const [address, setAddress] = React.useState({
    name: "",
    email: "",
    addressLine: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setAddress((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!address.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!address.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!address.addressLine.trim()) {
      newErrors.addressLine = "Address is required";
    }

    return (newErrors);
  };
  const handlePayment = async () => {
    if (paymentDetails) {
      const { payment_id, amount, currency } = paymentDetails;
      console.log(payment_id,amount,currency)
      // Set Razorpay payment options
      const addressValues = [address.name,address.email,address.addressLine];
      const options = {
        key: "rzp_test_KVYa3j27SRKqtq", // Replace with your Razorpay key
        amount: amount * 100, // Razorpay expects the amount in paise (smallest unit of currency)
        currency: currency,
        name: "Petfood",
        order_id: payment_id, // Order ID from backend, passed via `paymentDetails`
        handler: (response) => {
          console.log(response.razorpay_signature,response.razorpay_order_id,response.razorpay_payment_id)
          // Dispatch verifyPayment action with the response details
          dispatch(verifyPayment({
            payment_id: response.razorpay_payment_id, // Razorpay payment ID
            order_id: response.razorpay_order_id, // Razorpay order ID
            signature: response.razorpay_signature,
            address:addressValues // Razorpay payment signature
          }));
        },
        prefill: {
          name: address.name,
          email: address.email,
        },
      };
  
      // Open Razorpay checkout window
      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateInputs();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
   
  
    setTimeout(() => {
      handlePayment()
    }, 100);
    
    dispatch(initiateCheckout({ address }));
    
  };
const navigate=useNavigate()
  
  useEffect(() => {
    if (paymentVerified) {
      toast.success("Payment verified successfully!");
      // Navigate to a success page after payment verification
      dispatch(resetPaymentState());
      navigate("/");
    }
  }, [paymentVerified]);

  return (
    <div className="min-h-[100vh] w-full bg-[#f0f4f8]">
      <Navbar />
      <div className="min-h-[80vh] w-full flex flex-col md:flex-row justify-center items-center p-4 mt-10">
        <div className="h-auto w-full md:w-[45vw] p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center mb-6 md:mb-0">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Enter Your Name</label>
              <input
                value={address.name}
                onChange={handleInputChange("name")}
                type="text"
                placeholder="Enter Full Name"
                className={`p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Enter Your Email</label>
              <input
                value={address.email}
                onChange={handleInputChange("email")}
                type="email"
                placeholder="Enter your email"
                className={`p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Address Input */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Enter Your Address</label>
              <textarea
                value={address.addressLine}
                onChange={handleInputChange("addressLine")}
                placeholder="Enter your address"
                className={`p-2 border ${errors.addressLine ? "border-red-500" : "border-gray-300"} rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
                rows="4"
              />
              {errors.addressLine && <span className="text-red-500 text-sm">{errors.addressLine}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition-colors"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Razorpay Checkout Button */}
        
       
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSection;
