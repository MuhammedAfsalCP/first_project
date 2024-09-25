import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../App'

const UserDetail = () => {
  
  const { users, specificuser } = useContext(Pascomponent);
  const [a, seta] = useState(() => {
    // Check sessionStorage for previously saved users
    const storedUsers = sessionStorage.getItem('filteredusers');
    return storedUsers ? JSON.parse(storedUsers) : []; // Initialize with stored users or empty array
  });

  // Effect to filter users based on specificuser
  useEffect(() => {
    if (users && specificuser) {
      const filteredUsers = users.filter((x) => x.id === specificuser);
      seta(filteredUsers);
    }
  }, [users, specificuser]);

  // Effect to update sessionStorage when `a` changes
  useEffect(() => {
    if (a.length > 0) {
      sessionStorage.setItem('filteredusers', JSON.stringify(a));
    }
  }, [a]);

  return (
    <div>
    {a.map(user => (
      <div key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Render other properties as needed */}
      </div>
    ))}
  </div>
  )
}

export default UserDetail
