export const saveAccessToken = (token:string) => localStorage.setItem('accessToken', token);
export const saveRefreshToken = (token:string) => localStorage.setItem('refreshToken', token);
export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const save2FAVerified = () => localStorage.setItem('2fa_verified', String(true) );
export const is2FAVerified = () => !!localStorage.getItem('2fa_verified');
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('2fa_verified');
};