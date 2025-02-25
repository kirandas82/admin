// components/Auth/TwoFactorAuth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import useAuth from '../hooks/useAuth';

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);  
  const { verify2FA } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const success = await verify2FA(otp);

    if (success) {
      navigate('/company'); // Redirect to dashboard upon successful 2FA verification
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={3}
    >
      <Typography variant="h4" marginBottom={2}>
        Two-Factor Authentication
      </Typography>
      {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth={400}>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorAuth;
