import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pascomponent } from '../../App'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const ContaxtForm = ({ children }) => {
  //  managing user input and application state
  const [name, setName] = useState(""); // User's name
  const [email, setEmail] = useState(""); // User's email
  const [pass, setPass] = useState(""); // User's password
  const [confirm, setConfirm] = useState(""); // Password confirmation
  const [verifyname, setVerifyname] = useState(null); // Name validation
  const [verifyemail, setVerifyemail] = useState(null); // Email validation
  const [verifypass, setVerifypass] = useState(null); // Password validation
  const [verifyconfirm, setVerifyconfirm] = useState(null); // Confirmation validation
  const [storeemail, setStoreemail] = useState([]); // Storage for email
  const [loginmail, setLoginmail] = useState(""); // Login email
  const [loginpass, setLoginpass] = useState(""); // Login password
  const [showname, setShowname] = useState(""); // Name to display
  const [search, setSearch] = useState(""); // Search input

  //  cart and product management state
  const [itemfilter, setItemfilter] = useState(null); // Item filter
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [specificcart, setSpecificcart] = useState(""); // Specific cart item
  const [user, setUser] = useState(false); // User authentication status
  const [userid, setUserid] = useState(""); // User ID
  const [cartview, setCartview] = useState([]); // Cart items
  const [totalQuantity, setTotalquantity] = useState(0); // Total items in cart
  const [totalamount, setTotalamount] = useState(0); // Total amount in cart

  const navigate = useNavigate(); // navigation

  // registration detail check
  const handleSubmit = async (e) => {
    e.preventDefault();
    const namevalid = name.trim(); // Trimmed name for validation
    const passvalid = pass.split("").filter((x) => x === " "); // Check for spaces in password
    const response = await axios.get("http://localhost:3000/register-details"); // Fetch existing user data
    const check = response.data.find((x) => x.email === email); // Check for existing email

    // check all details
    if (
      namevalid.length !== 0 && email !== "" &&
      passvalid.length === 0 && confirm === pass &&
      pass.length >= 5 && confirm.length >= 5 &&
      check === undefined
    ) {
      // If validation is successful, register the user
      await axios.post("http://localhost:3000/register-details", {
        name,
        email,
        password: pass,
        cart: [],
        totalamount: 0,
        totalQuantity: 0,
        orderditems: []
      });
      navigate('/Login'); // Navigate to login page
      // reset all states
      setVerifyname(true);
      setVerifyconfirm(true);
      setVerifyemail(true);
      setVerifypass(true);
      setConfirm("");
      setEmail("");
      setName("");
      setPass("");
      toast.success("Successfully Registered"); // Show success message
    } else {
      // Handle validation errors
      if (name !== "") setVerifyname(true);
      else {
        setVerifyname(false);
        toast.error("please enter correct name");
      }
      if (email !== "" && check === undefined) setVerifyemail(true);
      else {
        setVerifyemail(false);
        toast.error("Email Already Existing");
      }
      if (passvalid.length === 0 && pass.length >= 5) setVerifypass(true);
      else {
        setVerifypass(false);
        toast.error("Please Create Strong Password");
      }
      if (confirm === pass && confirm.length >= 5) setVerifyconfirm(true);
      else {
        toast.error("Please Enter Correct Password");
        setVerifyconfirm(false);
      }
    }
  };

  // login details check
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/register-details"); // Fetch user data
      const check = response.data.find((x) => x.email === loginmail && x.password === loginpass); //  login validation

      if (check) {
        // If user is found, store user data in localStorage
        localStorage.setItem("user_Id", check.id);
        localStorage.setItem("user_name", check.name);
        localStorage.setItem('user', JSON.stringify(check));
        localStorage.removeItem('cart'); // Clear cart in localStorage
        const userResponse = await axios.get(`http://localhost:3000/register-details/${check.id}`);
        const userCart = userResponse.data.cart; // Fetch user's cart

        const totquantiy = userResponse.data.totalQuantity; // Total quantity
        const shownamename = userResponse.data.name; // User's name
        const totamount = userResponse.data.totalamount; // Total amount
        sessionStorage.setItem('cart', JSON.stringify(userCart)); // Store cart in sessionStorage

        // user data storing states
        setUserid(check.id);
        setCartview(userCart);
        setTotalquantity(totquantiy);
        setTotalamount(totamount);
        setShowname(shownamename);
        console.log(showname);
        setUser(true); // User verified
        toast.success("Login Successfully"); // Show success message
        navigate('/'); // Navigate to homepage
      } else {
        toast.error("Invalid Email or Password"); // Show error message
      }
    } catch (error) {
      console.error('Login error:', error); // Log any errors
    }
  };

  // logout
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear('user_Id'); // Clear user ID from localStorage
        setUserid(""); // Reset user ID state
        setCartview([]); // Clear cart view
        setUser(false); // Set user to logged out
        toast.success("Successfully Logout"); // Show success message
        navigate('/'); // Navigate to homepage
      }
    });
  };

  // cart add items
  const cartadd = async (item) => {
    if (user) { // Check if user is authenticated
      try {
        const response = await axios.get(`http://localhost:3000/register-details/${userid}`); // Fetch user data
        const detail = response.data;
        let cartData = detail.cart || []; // Get current cart
        let totalQuantity = detail.totalQuantity || 0; // Get total quantity
        let totalamount = detail.totalamount || 0; // Get total amount

        // item checking
        const itemExist = cartData.find(cartItem => cartItem.id === item.id);
        if (itemExist) {
          toast.error("Already Item Existing", {
            autoClose: 5000,
          });
        } else {
          // Add new item to the cart
          cartData = [...cartData, { ...item, quantity: 1, total_price: item.price }];
          totalQuantity += 1; // Increment total quantity
          totalamount += item.price; // Add item price to total amount
          toast.success("Item Added"); // Show success message
        }

        // Update state and localStorage
        setCartview(cartData);
        setTotalquantity(totalQuantity);
        setTotalamount(totalamount);
        localStorage.setItem('cart', JSON.stringify(cartData));
        localStorage.setItem('totalquantity', JSON.stringify(totalQuantity));
        localStorage.setItem('totalamount', JSON.stringify(totalamount));

        // Update user data in json
        await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
        await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity });
        await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount });
      } catch (error) {
        console.error('Error updating cart:', error); // Log any errors
      }
    } else {
      navigate('/Login'); // Redirect to login if user is not authenticated
    }
  };

  // UseEffect to retrieve stored cart data
  useEffect(() => {
    const storedCart = localStorage.getItem('cart'); // Retrieve cart from localStorage
    const storedQuantity = localStorage.getItem('totalquantity'); // Retrieve total quantity
    const storedAmount = localStorage.getItem('totalamount'); // Retrieve total amount
    const storedname = localStorage.getItem('user_name'); // Retrieve user name

    // Parse and set cart data
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartview(parsedCart); // Set cart view with stored cart
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }

    // Set the user name if it exists
    if (storedname) {
      const name = parseInt(storedname);
      if (!isNaN(name)) {
        setShowname(name); // Set displayed name
      }
    }

    // Parse and set total quantity
    if (storedQuantity) {
      const quantity = parseInt(storedQuantity, 10);
      if (!isNaN(quantity)) {
        setTotalquantity(quantity); // Set total quantity
      }
    }

    // Parse and set total amount
    if (storedAmount) {
      const amount = parseFloat(storedAmount);
      if (!isNaN(amount)) {
        setTotalamount(amount); // Set total amount
      }
    }

  }, [setCartview, setTotalquantity, setTotalamount, userid, setShowname]);

  // increment item quantity in cart
  const increament = async (item) => {
    try {
      const response = await axios.get(`http://localhost:3000/register-details/${userid}`); // Fetch user data
      const detail = response.data;
      let cartData = detail.cart || []; // Get current cart
      let totalQuantity = detail.totalQuantity; // Total quantity
      let totalamount = detail.totalamount; // Total amount

      // Check if the item exists in the cart
      const itemExist = cartData.find(cartItem => cartItem.id === item.id);

      if (itemExist) {
        // Increment item quantity
        cartData = cartData.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1, total_price: (cartItem.total_price || cartItem.price) + cartItem.price }
            : cartItem
        );
        totalQuantity += 1; // Increment total quantity
        totalamount += item.price; // Add item price to total amount
      } else {
        // If item does not exist, add it
        cartData = [...cartData, { ...item, quantity: 1, total_price: item.price }];
        totalQuantity += 1; // Increment total quantity
        totalamount += item.price; // Add item price to total amount
      }

      // Remove items with zero quantity
      cartData = cartData.filter(cartItem => cartItem.quantity > 0);

      // Update state and localStorage
      setCartview(cartData);
      setTotalquantity(totalQuantity);
      setTotalamount(totalamount);
      localStorage.setItem('cart', JSON.stringify(cartData));
      localStorage.setItem('totalquantity', JSON.stringify(totalQuantity));
      localStorage.setItem('totalamount', JSON.stringify(totalamount));

      // Update user data in the json
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount });
    } catch (error) {
      console.error('Error updating cart:', error); // Log any errors
    }
  };

  //  decrement item quantity in cart
  const decreament = async (item) => {
    try {
      const response = await axios.get(`http://localhost:3000/register-details/${userid}`); // Fetch user data
      const detail = response.data;
      let cartData = detail.cart || []; // Get current cart
      let totalQuantity = detail.totalQuantity; // Total quantity
      let totalamount = detail.totalamount; // Total amount

      // Check if the item exists in the cart
      const itemExist = cartData.find(cartItem => cartItem.id === item.id);

      if (itemExist) {
        // Decrement item quantity
        cartData = cartData.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1, total_price: (cartItem.total_price || cartItem.price) - cartItem.price }
            : cartItem
        );
        totalQuantity -= 1; // Decrement total quantity
        totalamount -= item.price; // Subtract item price from total amount
      } else {
        // If item does not exist, do nothing
        totalQuantity = totalQuantity; // Total quantity remains the same
        totalamount = totalamount; // Total amount remains the same
      }

      // Remove items with zero quantity
      cartData = cartData.filter(cartItem => cartItem.quantity > 0);

      // Update state and localStorage
      setCartview(cartData);
      setTotalquantity(totalQuantity);
      setTotalamount(totalamount);
      localStorage.setItem('cart', JSON.stringify(cartData));
      localStorage.setItem('totalquantity', JSON.stringify(totalQuantity));
      localStorage.setItem('totalamount', JSON.stringify(totalamount));

      // Update user data in the json
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount });
    } catch (error) {
      console.error('Error updating cart:', error); // Log any errors
    }
  };

  // delete a specific item from the cart
  const spesificdelete = async (item) => {
    try {
      const response = await axios.get(`http://localhost:3000/register-details/${userid}`); // Fetch user data
      const detail = response.data;
      toast.error("Delete The Item"); // Show delete message

      let cartData = detail.cart.filter((x) => x.id !== item.id); // Filter out the item to delete

      let totalQuantity = detail.totalQuantity - item.quantity; // Update total quantity
      let totalamount = detail.totalamount - item.total_price; // Update total amount

      // Update state and localStorage
      setCartview(cartData);
      localStorage.setItem('cart', JSON.stringify(cartData));
      setTotalquantity(totalQuantity);
      setTotalamount(totalamount);
      localStorage.setItem('totalquantity', totalQuantity);
      localStorage.setItem('totalamount', totalamount);

      // Update user data in the json
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount });
    } catch (error) {
      console.error('Error deleting item from cart:', error); // Log any errors
    }
  };

  // navigate to payment page
  const payment = () => {
    if (totalQuantity > 0) {
      navigate('/Payment'); // Navigate to payment page if there are items in the cart
    }
  };

  // State hooks for payment processing
  const [paymentview, setPaymentview] = useState(false);
  const [addressname, setAddressname] = useState(""); // Address name
  const [addressmail, setaddressmail] = useState(""); // Address email
  const [address, setaddress] = useState(""); // Address

  //  validate address input
  const Addresscheck = (e) => {
    e.preventDefault();
    setAddressname(addressname.trim()); // Trim address name
    setaddress(address.trim()); // Trim address
    if (address.length > 5 && addressname.length > 0) {
      setPaymentview(true); // Proceed to payment view if validation passes
    }
  };

  // verify order and handle payment
  const verifyOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/register-details/${userid}`); // Fetch user data
      const detail = response.data;
      Swal.fire({
        title: "Payment Received",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Back To Home"
      }).then((result) => {
        if (result.isConfirmed) {
          // Show success message
          navigate('/'); // Navigate to homepage
        }
      }); // Show success message
       // Navigate to homepage

      const cartItems = detail.cart || []; // Get current cart items
      let orderedItems = detail.orderditems || []; // Get ordered items
      localStorage.removeItem('cart'); // Clear cart in localStorage
      localStorage.removeItem('totalamount'); // Clear total amount
      localStorage.removeItem('totalquantity'); // Clear total quantity
      setCartview([]); // Clear cart view
      setTotalamount(0); // Reset total amount
      setTotalquantity(0); // Reset total quantity

      // Add ordered items to the user's data
      orderedItems = [...orderedItems, { address, name: addressname, email: addressmail, items: cartItems }];

      // Update user data in the json
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { orderditems: orderedItems });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: [] });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity: 0 });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount: 0 });
      console.log('Order verified and updated successfully'); // Log success
    } catch (error) {
      console.error('Error verifying the order:', error); // Log any errors
    }
  };
  const click=(cart_id,index)=>{
    setSpecificcart(cart_id)
    navigate(`/${index}`)
  }


  return (
    <div>
      <Pascomponent.Provider value={{click, search, setSearch, showname, setShowname, logout, verifyOrder, paymentview, setPaymentview, address, setaddress, addressmail, setaddressmail, addressname, setAddressname, Addresscheck, payment, spesificdelete, totalamount, setTotalamount, totalQuantity, setTotalquantity, decreament, setCartview, increament, cartadd, loginSubmit, handleSubmit, cartview, userid, setUserid, user, setUser, specificcart, setSpecificcart, filteredProducts, setFilteredProducts, itemfilter, setItemfilter, loginmail, setLoginmail, loginpass, setLoginpass, name, setName, email, setEmail, pass, setPass, confirm, setConfirm, verifyname, setVerifyname, verifyemail, setVerifyemail, verifypass, setVerifypass, verifyconfirm, setVerifyconfirm, storeemail, setStoreemail }}>
        {children}

      </Pascomponent.Provider>
    </div>
  )
}

export default ContaxtForm
