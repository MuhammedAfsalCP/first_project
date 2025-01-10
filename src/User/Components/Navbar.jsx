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
    <div className="fixed top-0 left-0 w-full z-50 bg-[#fcf8ef] shadow-md">
      <div className="flex justify-center">
        <nav className="w-[92%] h-[10vh] flex items-center justify-between">
          {/* Logo and Menu Toggle Button */}
          <div className="flex items-center w-[150px]">
            <span className="md:hidden cursor-pointer" onClick={toggleNavebar}>
              {isOpen
                ? <box-icon name="x"></box-icon>
                : <box-icon name="menu"></box-icon>}
            </span>
            <img src={logo} alt="Logo" className="ml-2" />
          </div>

          {/* Navigation Links */}
          <div
            style={{ top: isOpen ? "10vh" : "-100%" }}
            className="md:static fixed md:min-h-fit min-h-[30vh] left-0 md:w-auto w-full flex md:items-center px-5 bg-[#fcf8ef] transition-all duration-300"
          >
            <ul className="flex md:flex-row flex-col items-center md:gap-6 gap-4">
              <li className="hidden md:flex items-center">
                <div className="relative flex items-center">
                  <input
                    className="pl-5 pr-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    onChange={(e)=>dispatch(searchadd(e.target.value))}
                    placeholder="Search..."
                    type="search"
                  />
                  <button
                    className="absolute right-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    onClick={() => searching(search)}
                  >
                    Search
                  </button>
                </div>
              </li>

              <li>
                <Link to="/" onClick={All} className="font-semibold text-xl hover:text-gray-500">All</Link>
              </li>
              <li>
                <Link to="/" onClick={Dogs} className="font-semibold text-xl hover:text-gray-500">Dogs</Link>
              </li>
              <li>
                <Link to="/" onClick={Cats} className="font-semibold text-xl hover:text-gray-500">Cats</Link>
              </li>
              {/* Carts and Logout - Shown only when user is logged in */}
              {login && (
                <>
                  <li>
                    <Link to="/AddtoCart" className="font-semibold text-xl hover:text-gray-500 flex items-center">
                      <box-icon type="solid" name="cart"></box-icon>
                      <span className="ml-1">{cartItems.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Orders" className="font-semibold text-xl hover:text-gray-500 flex items-center">
                      <span className="ml-1">Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold text-xl hover:text-gray-500 flex items-center">
                      <box-icon name="user-circle" type="solid"></box-icon>
                      <span className="ml-1">{login?.username}</span>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout} className="font-semibold text-xl hover:text-gray-500">Logout</Link>
                  </li>
                </>
              )}

            </ul>
          </div>

          {/* Sign In / Sign Up Buttons */}
          {!login && (
            <div className="flex gap-4">
              <button onClick={() => navigate('/Login')} className="bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec] transition duration-300">Sign In</button>
              <button onClick={() => navigate('/Signup')} className="bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec] transition duration-300">Sign Up</button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
