import React from 'react';
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;