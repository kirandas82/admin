import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/LimitProfileService';
interface User {
    id: number;
    name: string;
    email: string;
  }

export const useFetchUsers = () => {
  const [users, setUser] = useState<User[]>([]);    // State to store user data
  const [loading, setLoading] = useState(true);     // State to handle loading state

    // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUser(userData as User[]);
      setLoading(false);   // Set loading to false after data is fetched
    };

    getUsers();
  }, []);

  return { users, loading };
};