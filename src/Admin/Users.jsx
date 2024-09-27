import axios from 'axios'; // Import axios for making HTTP requests
import React, { useContext, useEffect } from 'react'; // Import necessary React hooks and context
import { Pascomponent } from '../App'; // Import the context from your App

const Users = () => {
  // Destructure necessary values and functions from context
  const { userdetails, edituser, users, setUsers } = useContext(Pascomponent);

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make an API call to fetch user data
        const response = await axios.get("http://localhost:3000/register-details");
        // Filter out admin users (assuming admin users are marked with admin property)
        const filteredUsers = response.data.filter((user) => user.admin !== "true");
        // Update the users state with filtered users
        setUsers(filteredUsers);
        console.log(filteredUsers); // Log the filtered users for debugging
      } catch (error) {
        console.error("Error fetching users:", error); // Log any errors that occur
      }
    };

    fetchUsers(); // Call the fetch function
  }, [setUsers]); // Dependency array to only re-run if setUsers changes

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {/* Map through users and display them in a card format */}
      {users.map((user, index) => (
        <div
          key={user.id} // Use user ID as the unique key for each item
          className='w-full sm:w-72 md:w-80 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 relative'
        >
          {/* Edit user icon button */}
          <span className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer' onClick={() => edituser(user)}>
            <box-icon type='solid' name='edit-alt' size='md'></box-icon>
          </span>

          {/* User details section */}
          <div className='flex flex-col items-center p-6'>
            <div className='w-32 h-32 rounded-full overflow-hidden mb-4'>
              <img
                className='object-cover w-full h-full'
                // Placeholder image for user profile
                src='https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE='
                alt={user.name} // Alt text for image accessibility
              />
            </div>
            <h1 className='text-lg font-semibold text-gray-800'>{user.name}</h1>
            <h2 className='text-md text-gray-500'>Email: {user.email}</h2>
            <h2 className='text-md text-gray-500'>Status: {user.Block ? "Blocked" : "Active"}</h2>
          </div>

          {/* View Details button */}
          <div className='flex justify-center pb-4'>
            <button 
              onClick={() => userdetails(user.id, index)} // Call userdetails function on click
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users; // Export the Users component
