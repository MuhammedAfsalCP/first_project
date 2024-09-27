import React, { useContext, useEffect, useState } from 'react'; // Import necessary React hooks
import { Pascomponent } from '../App'; // Import the context from your App

const UserDetail = () => {
  // Destructure necessary values from context
  const { users, specificuser } = useContext(Pascomponent);
  
  // State to hold filtered user data
  const [user, setuser] = useState(() => {
    // Check sessionStorage for previously saved users
    const storedUsers = sessionStorage.getItem('filteredusers');
    return storedUsers ? JSON.parse(storedUsers) : []; // Initialize with stored users or empty array
  });

  // Effect to filter users based on specificuser
  useEffect(() => {
    if (users && specificuser) {
      const filteredUsers = users.filter((x) => x.id === specificuser); // Filter for specific user
      setuser(filteredUsers); // Set the filtered user data in state
    }
  }, [users, specificuser]);

  // Effect to update sessionStorage when `user` changes
  useEffect(() => {
    if (user.length > 0) {
      sessionStorage.setItem('filteredusers', JSON.stringify(user)); // Store the filtered users in sessionStorage
    }
  }, [user]);

  return (
    <div className="w-full h-full flex flex-wrap gap-4 p-4">
      {/* User Profile Section */}
      <div className="w-full lg:w-[48%] h-auto bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        {user.map((x, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-lg shadow-lg mb-4">
            {/* Profile Image */}
            <img
              src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
              alt="User Avatar" // Alt text for accessibility
              className="rounded-full w-24 h-24 sm:mr-6 mb-4 sm:mb-0" // Styling for the image
            />
            {/* User Info */}
            <div>
              <h1 className="text-xl font-bold text-gray-800">Name: {x.name}</h1>
              <h2 className="text-md text-gray-600">Email: {x.email}</h2>
              <h3 className="text-md text-gray-500">Password: {x.password}</h3> {/* Note: Displaying password directly can be a security risk */}
            </div>
          </div>
        ))}
      </div>

      {/* Financial Summary Section */}
      <div className="w-full lg:w-[48%] h-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
        {user.map((x) => (
          <div key={x.name}>
            {x.orderditems.map((item, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow mb-4">
                <h1 className="text-xl font-bold">Received Money: {item.Totalamount}</h1>
                <h1 className="text-xl font-bold">Ordered Items Quantity: {item.TotalQuantity}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-[48%] h-[60%] bg-white p-6 rounded-lg shadow-lg overflow-scroll">
        <h2 className="sticky top-0 bg-blue-500 text-white text-center text-2xl font-bold p-4 rounded-lg">
          Cart
        </h2>
        {user.map((x, userIndex) => (
          <div key={userIndex}>
            {x.cart.map((item, itemIndex) => (
              <div key={itemIndex} className="flex flex-col md:flex-row bg-white p-4 shadow-lg rounded-lg mb-4">
                {/* Image */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={item.image} // Item image
                    alt="Item"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                {/* Item Details */}
                <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                  <h1 className="text-lg font-bold">Total Quantity: {item.quantity}</h1>
                  <h1 className="text-lg">Total Price: {item.total_price}</h1>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="w-full lg:w-[48%] h-[60%] bg-white p-6 rounded-lg shadow-lg overflow-scroll">
        <h2 className="sticky top-0 bg-blue-500 text-white text-center text-2xl font-bold p-4 rounded-lg">
          Orders
        </h2>
        {user.map((x, userIndex) => (
          <div key={userIndex}>
            {x.orderditems.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-8">
                <h1 className="text-xl font-bold text-blue-600">Name: {item.name}</h1>
                <h2 className="text-md text-gray-700 mb-4">Address: {item.address}</h2>
                {item.items.map((pro, proIndex) => (
                  <div key={proIndex} className="flex flex-col md:flex-row bg-white p-4 shadow-lg rounded-lg mb-4">
                    {/* Image */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                      <img
                        src={pro.image} // Product image
                        alt="Item"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                    {/* Item Details */}
                    <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                      <h1 className="text-lg font-bold">Total Quantity: {pro.quantity}</h1>
                      <h1 className="text-lg">Total Price: {pro.total_price}</h1>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetail; // Export the UserDetail component
