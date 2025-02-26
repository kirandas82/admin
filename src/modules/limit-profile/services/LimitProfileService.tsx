import axios from "axios";

// Simulate API call to fetch users
export const fetchUsers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Sam Brown', email: 'sam@example.com' },
        ]);
      }, 1000);
    });
  };

// Simulate API call to fetch limit Profile
// async (): Promise<{ data: UserProfile[] }

export const fetchLimitProfile = async () => {
  const response =  await axios.get('https://jsonplaceholder.typicode.com/users'); // Example API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        response.data
      );
    }, 1000);
  })

};

  