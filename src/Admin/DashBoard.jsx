import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../App';

const DashBoard = () => {
  const [products, setProducts] = useState([])
  const {users,setUsers}=useContext(Pascomponent)
  const [order,setOrder]=useState([])
  const [earning,setEarning]=useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/register-details");
        const filteredUsers = response.data.filter((user) => user.admin !== "true"); // Filter users here
        setUsers(filteredUsers);  // Set only non-admin users
        console.log(filteredUsers);  // Log filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
   fetchUsers()
  }, [setUsers]); 
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:3000/Prudocts");
             // Corrected URL
            setProducts(response.data); 
           // Set the products state with the response data
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchProducts();
        
      }, []);
      useEffect(() => {
        const fetchEarnings = async () => {
          try {
            const response = await axios.get("http://localhost:3000/orders/earnings");
             // Corrected URL
             setEarning(response.data.earning); 
           // Set the products state with the response data
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchEarnings();
        
      }, []);
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:3000/orders");
             // Corrected URL
            setOrder(response.data); 
           // Set the products state with the response data
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchProducts();
        
      }, []);
      useEffect(()=>{
        const productadd=()=>{
          console.log(products)
          return products
          
        }
        productadd()
      },[products])
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-full mx-auto">
        <div className="divide-y divide-gray-200">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

          {/* <!-- Dashboard Stats --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* <!-- Total Users --> */}
            <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
              <p className="text-4xl font-bold text-blue-500 mt-2">{users.length}</p>
              <p className="text-sm text-gray-500 mt-1">Active Users</p>
            </div>

            {/* <!-- Total Orders --> */}
            <div className="bg-green-100 rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
              <p className="text-4xl font-bold text-green-500 mt-2">{order.length-1}</p>
              <p className="text-sm text-gray-500 mt-1">Orders Processed</p>
            </div>

            {/* <!-- Total Products --> */}
            <div className="bg-yellow-100 rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
              <p className="text-4xl font-bold text-yellow-500 mt-2">{products.length}</p>
              <p className="text-sm text-gray-500 mt-1">Available Products</p>
            </div>

            {/* <!-- Total Earnings --> */}
            <div className="bg-red-100 rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Earnings</h3>
              <p className="text-4xl font-bold text-red-500 mt-2">${earning}</p>
              <p className="text-sm text-gray-500 mt-1">Revenue Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}

export default DashBoard
