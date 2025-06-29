import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth-context';

export const useUserRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user has admin role
      // This could be based on user.role, user.isAdmin, or any other property
      setIsAdmin(user.role === 'admin' || user.isAdmin === true);
    } else {
      setIsAdmin(false);
    }
  }, [user, isAuthenticated]);

  // Function to manually set admin status (useful for testing or admin login)
  const setAdminStatus = (status) => {
    setIsAdmin(status);
  };

  return {
    isAdmin,
    setAdminStatus,
    userRole: isAdmin ? 'admin' : 'user'
  };
};