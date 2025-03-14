import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { Button } from "antd";

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
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default Logout;