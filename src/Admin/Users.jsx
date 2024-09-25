import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../App';

const Users = () => {
  
 const {userdetails,filtereduser, setFiltereduser,userfilter,setUserfilter,users, setUsers}=useContext(Pascomponent)
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
}, []);  // Runs once when the component mounts

// If needed, you can track users changes with this effect
 // This effect will run when 'users' changes

  return (
    <div className='flex flex-wrap justify-center gap-5'>
  {users.map((user,index) => (
    <div
      key={user.id}
      className='w-full sm:w-72 md:w-80 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 relative'
    >
      {/* Edit Icon in Top-Right Corner */}
      <span className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer'>
        <box-icon type='solid' name='edit-alt' size='md'></box-icon>
      </span>

      {/* User Avatar and Info */}
      <div className='flex flex-col items-center p-6'>
        <div className='w-32 h-32 rounded-full overflow-hidden mb-4'>
          <img
            className='object-cover w-full h-full'
            src='https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE='
            alt={user.name}
          />
        </div>
        <h1 className='text-lg font-semibold text-gray-800'>{user.name}</h1>
        <h2 className='text-md text-gray-500'>Email: {user.email}</h2>
      </div>

      {/* Button */}
      <div className='flex justify-center pb-4'>
        <button onClick={()=>userdetails(user.id,index)} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'>
          View Details
        </button>
      </div>
    </div>
  ))}
</div>


  )
}

export default Users
