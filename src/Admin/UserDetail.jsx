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
  <div className="w-1/2 h-1/2 bg-gray-100 p-4 flex flex-col items-center justify-center">
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
        <div>
         
        </div>
      </div>
    ))}
  </div>
   <div>
    {user.map((x)=>{
      return(
        <>
        {x.orderditems.map((item)=>{
          return(
            <>
             <h1>item:{item.Totalamount}</h1>
            </>
          )
        })}
        </>
      )
    })}
   </div>
  {/* Black section */}
  <div className="w-1/2 h-1/2 flex flex-col items-center justify-start overflow-scroll">
  {/* Styled Sticky Cart Header */}
  <h1 className="sticky top-0 bg-blue-500 text-white w-full text-center text-2xl font-bold p-4 shadow-lg z-10 rounded">
    Cart
  </h1>

  {/* Cart Items */}
  {user.map((x, userIndex) => {
    return (
      <div key={userIndex} className="w-full">
        {x.cart.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className="w-full h-auto p-4 bg-white shadow-lg rounded-lg m-2 flex flex-col md:flex-row">
              {/* Image section */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <img 
                  src={item.image} 
                  alt="Item" 
                  className="w-full h-40 object-cover rounded-md" 
                />
              </div>
              
              {/* Item details section */}
              <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                <h1 className="text-lg font-bold">Total Quantity: {item.quantity}</h1>
                <h1 className="text-lg">Total Price: {item.total_price}</h1>
              </div>
            </div>
          );
        })}
      </div>
    );
  })}
</div>





  {/* Green section */}
  <div className="w-1/2 h-1/2 flex flex-col items-center justify-start overflow-scroll">
  {/* Styled Sticky Cart Header */}
  <h1 className="sticky top-0 bg-blue-500 text-white w-full text-center text-2xl font-bold p-4 shadow-lg z-10 rounded">
    Orders
  </h1>

  {/* Cart Items */}
  {user.map((x, userIndex) => {
    return (
      <div key={userIndex} className="w-full">
        {x.orderditems.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className="mb-8">
              {/* Order Item Section */}
              <h1 className="text-xl font-bold text-blue-600">Name: {item.name}</h1>
              <h2 className="text-md text-gray-700 mb-4">Address: {item.address}</h2>
    
              {/* Item Details Section */}
              {item.items.map((pro, proIndex) => {
                return (
                  <div key={proIndex} className="w-full h-auto p-4 bg-white shadow-lg rounded-lg m-2 flex flex-col md:flex-row">
                    {/* Image section */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                      <img 
                        src={pro.image} 
                        alt="Item" 
                        className="w-full h-40 object-cover rounded-md" 
                      />
                    </div>
    
                    {/* Item details section */}
                    <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                      <h1 className="text-lg font-bold">Total Quantity: {pro.quantity}</h1>
                      <h1 className="text-lg">Total Price: {pro.total_price}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
    
  })}
</div>
</div>

  )
}

export default UserDetail
