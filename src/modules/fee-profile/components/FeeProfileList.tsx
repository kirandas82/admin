import { capitalizeName } from '../utils/formatUtils';
import { useFetchFeeProfile } from '../hooks/FeeProfileFetch';
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';

const FeeProfileList = () => {
  const { users, loading } = useFetchFeeProfile();  // Using custom hook for fetching users
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term

  // Filter users based on the search term
  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the user list with search
  return (
    <div>
      <Card className='content'>
        <CardHeader title="Fee Profile List" />
        <CardContent>
          <input
            type="text"
            placeholder="Search config..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length > 0 ? (
            <ul>
              {filteredUsers.map((user: any) => (
                <li key={user.id}>
                  <p><strong>Name:</strong> {capitalizeName(user.name)}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeProfileList;