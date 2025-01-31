import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, logout } from '../../Redex/UserSlice';
import { fetchProducts, fetchProductsByCategory, searchadd, searchProducts } from '../../Redex/ProductSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getCart } from '../../Redex/CartSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
    const { search } = useSelector(state => state.Products);
  const { login, token } = useSelector((state) => state.User);
  const { cartData } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const cartItems = cartData?.[0]?.cartitems || [];
  const toggleNavebar = () => {
    setIsOpen(!isOpen);
  };

  // Fetch cart data when the component loads


  useEffect(() => {
    if (token) {
      // Fetch user details when token is available
      dispatch(fetchUserDetails(token));
      dispatch(getCart())

    } else {
      console.log("No token found. Please log in.");
    }
  }, [token, dispatch]);

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
        dispatch(logout());  // Dispatch the logout action to clear user data
        navigate('/');

        toast.success("Successfully Logout"); // Show success message
        // Navigate to homepage
      }
    });
    // Redirect the user to the login page after logging out
  };

  const Dogs = () => {
    dispatch(fetchProductsByCategory('Dog'));
  };

  const Cats = () => {
    dispatch(fetchProductsByCategory('Cat'));
  };
  const All = () => {
    dispatch(fetchProducts({ page: 1, url: null }));
  };
  const searching=(productname)=>{
    if(search?.length>0){
      console.log('hi')
      dispatch(searchProducts(productname))
    }else{
    dispatch(fetchProducts({ page: 1, url: null }));
  }
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
  <div className="flex justify-center">
    <nav className="w-[92%] h-[10vh] flex items-center justify-between">
      {/* Logo and Menu Toggle */}
      <div className="flex items-center">
        <span className="md:hidden cursor-pointer text-gray-800" onClick={toggleNavebar}>
          {isOpen ? (
            <box-icon name="x" color="gray"></box-icon>
          ) : (
            <box-icon name="menu" color="gray"></box-icon>
          )}
        </span>
        <img src={logo} alt="Logo" className="ml-4 h-10" />
      </div>

      {/* Search Bar (Mobile) */}
      <div className="relative flex items-center md:hidden">
        <input
          className="pl-5 pr-4 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => dispatch(searchadd(e.target.value))}
          placeholder="Search..."
          type="search"
        />
        <button
          className="absolute right-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-all duration-300"
          onClick={() => searching(search)}
        >
          Search
        </button>
      </div>

      {/* Navigation Links */}
      <div
        style={{ top: isOpen ? "10vh" : "-100%" }}
        className="md:static fixed md:min-h-fit min-h-[40vh] left-0 md:w-auto w-full flex flex-col md:flex-row md:items-center px-5 bg-white transition-all duration-300"
      >
        <ul className="flex md:flex-row flex-col items-center md:gap-6 gap-4 w-full">
          {/* Search Bar (Desktop) */}
          <li className="hidden md:flex items-center">
            <div className="relative flex items-center">
              <input
                className="pl-5 pr-4 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                onChange={(e) => dispatch(searchadd(e.target.value))}
                placeholder="Search..."
                type="search"
              />
              <button
                className="absolute right-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-all duration-300"
                onClick={() => searching(search)}
              >
                Search
              </button>
            </div>
          </li>

          {/* Navigation Items */}
          <li>
            <Link to="/" onClick={All} className="font-semibold text-lg text-gray-800 hover:text-blue-500">
              All
            </Link>
          </li>
          <li>
            <Link to="/" onClick={Dogs} className="font-semibold text-lg text-gray-800 hover:text-blue-500">
              Dogs
            </Link>
          </li>
          <li>
            <Link to="/" onClick={Cats} className="font-semibold text-lg text-gray-800 hover:text-blue-500">
              Cats
            </Link>
          </li>

          {/* Cart and Logout (If Logged In) */}
          {login && (
            <>
              <li>
                <Link
                  to="/AddtoCart"
                  className="font-semibold text-lg text-gray-800 hover:text-blue-500 flex items-center"
                >
                  <box-icon type="solid" name="cart" color="gray"></box-icon>
                  <span className="ml-1">{cartItems.length}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Orders"
                  className="font-semibold text-lg text-gray-800 hover:text-blue-500 flex items-center"
                >
                  <span className="ml-1">Orders</span>
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-lg text-gray-800 hover:text-blue-500 flex items-center">
                  <box-icon name="user-circle" type="solid" color="gray"></box-icon>
                  <span className="ml-1">{login?.username}</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="font-semibold text-lg text-gray-800 hover:text-blue-500">
                  Logout
                </Link>
              </li>
            </>
          )}

          {/* Sign In / Sign Up Buttons (Moved Inside Menu) */}
          {!login && (
            <div className="flex md:hidden flex-col gap-2 w-full mt-4">
              <button
                onClick={() => navigate('/Login')}
                className="bg-blue-500 w-full py-2 rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/Signup')}
                className="bg-blue-500 w-full py-2 rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          )}
        </ul>
      </div>

      {/* Sign In / Sign Up Buttons (Desktop) */}
      {!login && (
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate('/Login')}
            className="bg-blue-500 w-[90px] h-[40px] rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/Signup')}
            className="bg-blue-500 w-[90px] h-[40px] rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  </div>
</div>

  


  

  );
};

export default Navbar;
