import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useValidationSchema } from '../../../shared/validation/validationSchema';
import useAuth from '../hooks/useAuth';

// import i18n from '../../../i18n/i18n';

interface LoginFormInputs {
  user_name: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { login, is2FARequired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const validationSchema = useValidationSchema();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema) as any,
  });
  // if (pathname == '/login') {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('is2FAComplete');
  // }
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('Logging in with:', data);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const success = await login(data.user_name, data.password);
      if (!success) {
        setError('Invalid username or password');
      } else if (is2FARequired) {
        navigate('/2fa'); // Redirect to 2FA page if 2FA is required
      }
      else {
        // Successful login
        navigate('/company');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {t('login')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
        {/* Email Field */}
        <Controller
          name="user_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t('username')}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.user_name}
              helperText={errors.user_name?.message}
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t('password')}
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{ marginTop: 2, height: '56px' }}
          startIcon={isSubmitting ? <CircularProgress size={20} role='progressbar' /> : null}
        >
          {isSubmitting ? t('logging_in') : t('login')}
        </Button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* <section className="languages">
        <button onClick={() => changeLanguage('en')}>en</button>
        <button onClick={() => changeLanguage('ar')}>ar</button>
      </section>  */}
    </Box>


  );
};

export default Login;