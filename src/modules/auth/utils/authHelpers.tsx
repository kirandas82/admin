// Mock function to simulate login validation
export const validateLogin = (username:string, password:string) => {
    return username === 'michael' && password === 'success-password';
  };
  
  // Mock function to simulate OTP generation
  export const generateOTP = () => {
    return '123456'; // In a real application, you would generate a unique OTP
  };
  
  // Mock function to verify OTP
  export const verifyOTP = (inputOtp: any, correctOtp: any) => {
    return inputOtp === correctOtp;
  };