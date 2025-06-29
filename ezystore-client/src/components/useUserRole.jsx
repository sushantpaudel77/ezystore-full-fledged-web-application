import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth-context';

export const useUserRole = () => {
  const { user, isAuthenticated } = useAuth();
  
  // 🔧 TESTING FLAG - Set this to true to test admin functionality
  const TESTING_ADMIN_MODE = false; // Change this to true to test admin features
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user has admin role OR if testing mode is enabled
      const userIsAdmin = user.role === 'admin' || user.isAdmin === true;
      setIsAdmin(userIsAdmin || TESTING_ADMIN_MODE);
    } else {
      // If not authenticated but testing mode is on, still show admin features
      setIsAdmin(TESTING_ADMIN_MODE);
    }
  }, [user, isAuthenticated]);

  // Function to manually set admin status (useful for testing or admin login)
  const setAdminStatus = (status) => {
    setIsAdmin(status);
  };

  return {
    isAdmin,
    setAdminStatus,
    userRole: isAdmin ? 'admin' : 'user',
    isTestingMode: TESTING_ADMIN_MODE // Expose testing flag if needed
  };
};