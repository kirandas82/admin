import { useState, useEffect } from 'react';
import { fetchUsers, fetchLimitProfile } from '../services/LimitProfileService';
interface User {
    id: number;
    name: string;
    email: string;
  }

// Define the structure of the data you are expecting from the API
interface LimitProfileData {
  id: number;
  name: string;
  age?: number; // We can generate a random age, so it's optional
  email: string;
}

export const useFetchLimiProfile = () => {
  const [users, setUser] = useState<User[]>([]);    // State to store user data

  // State to hold the fetched data
  const [rows, setRows] = useState<LimitProfileData[]>([]);
  const [loading, setLoading] = useState(true);

    // Fetch users when the component mounts
  useEffect(() => {
     const fetchData = async () => {
      // const userData = await fetchUsers();
      // setUser(userData as User[]);
      // setLoading(false);   // Set loading to false after data is fetched
    // };

    // getUsers();
    try {
      const res = await fetchLimitProfile()
      const data = res as LimitProfileData[]
      console.log(res)
      // Map data to fit the table format (adjust depending on your server data)
      const formattedRows = data.map((item: { id: any; name: any; email: any; }, index: any) => ({
        id: item.id,
        name: item.name,
        age: Math.floor(Math.random() * 50) + 18, // Random age for example
        email: item.email,
      }));
      
      setRows(formattedRows as LimitProfileData[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  fetchData();

  }, []);

  return { rows, loading };
};