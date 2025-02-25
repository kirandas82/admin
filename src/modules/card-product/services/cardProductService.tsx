// Simulate API call to fetch users
export const fetchCardProduct = async () => {
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