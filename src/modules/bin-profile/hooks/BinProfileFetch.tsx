import { useState, useEffect } from 'react';
import { fetchBinProfile } from '../services/BinProfileService';
interface User {
    id: number;
    name: string;
    email: string;
  }

export const useFetchBinProfiles = () => {
  const [users, setUser] = useState<User[]>([]);    // State to store user data
  const [loading, setLoading] = useState(true);     // State to handle loading state

    // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchBinProfile();
      setUser(userData as User[]);
      setLoading(false);   // Set loading to false after data is fetched
    };

    getUsers();
  }, []);

  return { users, loading };
};