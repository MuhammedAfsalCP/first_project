import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../App'

const UserDetail = () => {
  
  const { users, specificuser } = useContext(Pascomponent);
  const [user, setuser] = useState(() => {
    // Check sessionStorage for previously saved users
    const storedUsers = sessionStorage.getItem('filteredusers');
    return storedUsers ? JSON.parse(storedUsers) : []; // Initialize with stored users or empty array
  });

  // Effect to filter users based on specificuser
  useEffect(() => {
    if (users && specificuser) {
      const filteredUsers = users.filter((x) => x.id === specificuser);
      setuser(filteredUsers);
    }
  }, [users, specificuser]);

  // Effect to update sessionStorage when `a` changes
  useEffect(() => {
    if (user.length > 0) {
      sessionStorage.setItem('filteredusers', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="w-full h-full flex flex-wrap">
  {/* User profile section */}
  <div className="w-full h-1/2 bg-gray-100 p-4 flex flex-col items-center justify-center">
    {user.map((x, index) => (
      <div
        key={index}
        className="flex items-center bg-white p-6 rounded-lg shadow-lg w-full h-ful"
      >
        {/* Profile image aligned to the left */}
        <img
          src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
          alt="User Avatar"
          className="rounded-full w-24 h-24 mr-6"
        />
        
        {/* Text content on the right */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">Name: {x.name}</h1>
          <h2 className="text-md text-gray-600">Email: {x.email}</h2>
          <h3 className="text-md text-gray-500">Password: {x.password}</h3>
        </div>
      </div>
    ))}
  </div>

  {/* Black section */}
  <div className="w-1/2 h-1/2 flex flex-wrap items-center justify-center overflow-scroll">
  {user.map((x, userIndex) => {
    return (
      <div key={userIndex} className="w-full">
        {x.cart.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className="w-[100%] h-[100%] p-4 bg-white shadow-lg rounded-lg m-2">
              <img src={item.image} alt="Item" className="w-full h-auto mb-4" />
              <h1 className="text-lg font-bold">Total Quantity: {item.quantity}</h1>
              <h1 className="text-lg">Total Price: {item.total_price}</h1>
            </div>
          );
        })}
      </div>
    );
  })}
</div>


  {/* Green section */}
  <div className="w-1/2 h-1/2 bg-green-600 flex items-center justify-center">
    <h1 className="text-white text-3xl">Green Section</h1>
  </div>
</div>

  )
}

export default UserDetail
