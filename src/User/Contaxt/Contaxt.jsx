import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pascomponent } from '../../App'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  const [admin, setAdmin] = useState(false)
  //  cart and product management state
  const [itemfilter, setItemfilter] = useState(null);
  const [userfilter, setUserfilter] = useState(null); // Item filter
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtereduser, setFiltereduser] = useState([]); // Filtered products
  const [specificcart, setSpecificcart] = useState("");
  const [specificuser, setSpecificuser] = useState(""); // Specific cart item
  const [user, setUser] = useState(false); // User authentication status
  const [userid, setUserid] = useState(""); // User ID
  const [cartview, setCartview] = useState([]); // Cart items
  const [totalQuantity, setTotalquantity] = useState(0); // Total items in cart
  const [totalamount, setTotalamount] = useState(0); // Total amount in cart

  const navigate = useNavigate(); // navigation
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
        setAdmin(false)
        setShowname("")
        toast.success("Successfully Logout"); // Show success message
        navigate('/'); // Navigate to homepage
      }
    });
  };

  // cart add items
  const cartadd = async (item) => {
    if (user) { // Check if user is authenticated
      try {
        const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
        // Fetch user data
        const detail = response.data;
        let block = detail.Block

        if (block == false) {
          let cartData = detail.cart || []; // Get current cart
          let totalQuantity = detail.totalQuantity || 0; // Get total quantity
          let totalamount = detail.totalamount || 0; // Get total amount

          // item checking
          const itemExist = cartData.find(cartItem => cartItem.id === item.id);
          if (itemExist) {
            toast.success("Item Already Added ,Quantity Increased ", {
              autoClose: 5000,
            });
            cartData = cartData.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1, total_price: (cartItem.total_price || cartItem.price) + cartItem.price }
                : cartItem
            );
            totalQuantity += 1; // Increment total quantity
            totalamount += item.price;
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
        } else {
          Swal.fire("Please contact admin");
        }
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
        totalamount -= item.price;
        if(totalQuantity==0){
          toast.error("Item Deleted")
        } // Subtract item price from total amount
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
      toast.error("Item Deleted"); // Show delete message

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
      const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
      const response2 = await axios.get(`http://localhost:3000/orders/earnings`);
      const detail2 = response2.data
      const inc = detail2.earning + totalamount

     


      // Fetch user data
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
      orderedItems = [...orderedItems, { address, name: addressname, email: addressmail, items: cartItems, Totalamount: totalamount, TotalQuantity: totalQuantity }];

      // Update user data in the json
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { orderditems: orderedItems });
      await axios.patch(`http://localhost:3000/orders/earnings`, { earning: inc });

      await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: [] });
      await axios.post(`http://localhost:3000/orders`, { order: totalQuantity })
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalQuantity: 0 });
      await axios.patch(`http://localhost:3000/register-details/${userid}`, { totalamount: 0 });
     
    } catch (error) {
      console.error('Error verifying the order:', error); // Log any errors
    }
  };
  const click = (cart_id, index) => {
    setSpecificcart(cart_id)
    navigate(`/cart/${index}`)
  }
  //admin
  // find user details navigate
  const userdetails = (cart_id, index) => {
    setSpecificuser(cart_id); 
    setUserfilter(true); // set user true
    navigate(`/${index}`); 
  }

  const [users, setUsers] = useState([]); // save user data

  // user edit
  const edituser = async (user) => {
    // pop up edit
    Swal.fire({
      title: user.name,
      showCancelButton: true, 
      showDenyButton: true,
      showConfirmButton: true, 
      showCloseButton: true, 
      confirmButtonText: 'Block', 
      denyButtonText: 'Delete',
      cancelButtonText: 'Unblock',
      closeButtonHtml: 'x',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // block buttun clicked
        try {
          // block true set
          await axios.patch(`http://localhost:3000/register-details/${user.id}`, { Block: true });
         
          await refreshUserData(); // data refresh
        } catch (error) {
          console.error("Error blocking user:", error); 
        }
      } else if (result.isDenied) {
        // delete button clicked
        try {
          // deleting user
          await axios.delete(`http://localhost:3000/register-details/${user.id}`);
          setUsers((prevUsers) => prevUsers.filter((x) => x.id !== user.id)); // state update remove deleted user
        
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        // un block button clicked
        try {
          // setblock false
          await axios.patch(`http://localhost:3000/register-details/${user.id}`, { Block: false });
         
          await refreshUserData(); // data refresh
        } catch (error) {
          console.error("Error unblocking user:", error); // Log any errors
        }
      }
    });
  };

  // refresh function
  const refreshUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/register-details'); // getting all users

      // filtering non admin users
      const nonAdminUsers = response.data.filter(user => !user.admin); 

      setUsers(nonAdminUsers); // filter data set users
    
    } catch (error) {
      console.error("Error refreshing user data:", error); // Log any errors
    }
  };

  const [products, setProducts] = useState([]); // product state

  // product delete
  const productdelete = async (item) => {
    try {
      
      // deleting the product
      await axios.delete(`http://localhost:3000/Prudocts/${item.id}`);
      // state updating
      setProducts((prevUsers) => prevUsers.filter((x) => x.id !== item.id));
     
    } catch (error) {
      console.error("Error deleting user:", error); 
    }
  }

  // editing pop up state set
  const [showModal, setShowModal] = useState(false); 



  return (
    <div>
      <Pascomponent.Provider value={{ showModal, setShowModal, productdelete, products, setProducts, edituser, users, setUsers, userfilter, setUserfilter, filtereduser, setFiltereduser, specificuser, setSpecificuser, userdetails, admin, setAdmin, click, search, setSearch, showname, setShowname, logout, verifyOrder, paymentview, setPaymentview, address, setaddress, addressmail, setaddressmail, addressname, setAddressname, Addresscheck, payment, spesificdelete, totalamount, setTotalamount, totalQuantity, setTotalquantity, decreament, setCartview, increament, cartadd, cartview, userid, setUserid, user, setUser, specificcart, setSpecificcart, filteredProducts, setFilteredProducts, itemfilter, setItemfilter, loginmail, setLoginmail, loginpass, setLoginpass, name, setName, email, setEmail, pass, setPass, confirm, setConfirm, verifyname, setVerifyname, verifyemail, setVerifyemail, verifypass, setVerifypass, verifyconfirm, setVerifyconfirm, storeemail, setStoreemail }}>
        {children}

      </Pascomponent.Provider>
    </div>
  )
}

export default ContaxtForm
