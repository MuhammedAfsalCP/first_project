import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Pascomponent } from '../App';

const DashBoard = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const { users, setUsers } = useContext(Pascomponent); // Extracting users from context
  const [order, setOrder] = useState([]); // State to hold orders
  const [earning, setEarning] = useState(null); // State to hold earnings

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/register-details");
        // Filter out admin users
        const filteredUsers = response.data.filter((user) => user.admin !== "true");
        setUsers(filteredUsers); // Set non-admin users in context
        console.log(filteredUsers); // Log filtered users for debugging
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [setUsers]);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts");
        setProducts(response.data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch earnings data from the server
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders/earnings");
        setEarning(response.data.earning); // Set earnings state
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };
    fetchEarnings();
  }, []);

  // Fetch orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrder(response.data); // Set orders state with fetched data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Log products whenever the products state changes (for debugging)
  useEffect(() => {
    const productAdd = () => {
      console.log(products); // Log products to console
      return products; // Return products (not necessary to return)
    };
    productAdd();
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <div className="divide-y divide-gray-200">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

              {/* Dashboard Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Users */}
                <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
                  <p className="text-4xl font-bold text-blue-500 mt-2">{users.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Active Users</p>
                </div>

                {/* Total Orders */}
                <div className="bg-green-100 rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
                  <p className="text-4xl font-bold text-green-500 mt-2">{order.length - 1}</p>
                  <p className="text-sm text-gray-500 mt-1">Orders Processed</p>
                </div>

                {/* Total Products */}
                <div className="bg-yellow-100 rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                  <p className="text-4xl font-bold text-yellow-500 mt-2">{products.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Available Products</p>
                </div>

                {/* Total Earnings */}
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
  );
};

export default DashBoard;
