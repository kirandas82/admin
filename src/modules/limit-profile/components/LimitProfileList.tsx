

import { Box, Stack, Card, CardHeader, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFetchLimiProfile } from '../hooks/LimitProfileFetch';


const LimitProfileList = () => {
  const { rows, loading } = useFetchLimiProfile();  // Using custom hook for fetching users


  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];


  // Render the limit list with search
  return (
    <div>
      <Card className='content'>
        <CardHeader title="Limit Profile List" />
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            </Stack>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              // checkboxSelection
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default LimitProfileList;