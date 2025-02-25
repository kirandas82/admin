
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { loginUser, logoutUser, verifyOTP } from '../services/authService';

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    // isAuthenticated: boolean;
    is2FARequired: boolean;
    authState: AuthState,
    login: (username: string, password: string) => Promise<boolean>;
    verify2FA: (otp: string) => Promise<boolean>;
    logout: () => void;
    loading:string;
}

// Define the AuthState type
interface AuthState {
    isAuthenticated: boolean;
    is2FAComplete: boolean;
    token: string | null; // Allow token to be string or null
}

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContext = createContext<any>(null);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [is2FARequired, setIs2FARequired] = useState(false);  // TODO: 2fA is no reqiured make as false
    const [otp, setOtp] = useState<string | null>(null);
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        is2FAComplete: false,
        token: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const stored2FAComplete = localStorage.getItem('is2FAComplete') === 'true';
       // console.log("Restoring auth state on mount:", { storedToken, stored2FAComplete });

        if (storedToken) {
            setAuthState({
                isAuthenticated: true,
                token: storedToken,
                is2FAComplete: stored2FAComplete,
            });
        }
        setLoading(false); // Set loading to false after initialization
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const result = await loginUser(username, password);
            result.is2FARequired = false; // TODO: need to remove on actual implementation
            result.otp = '123456'; // TODO: need to remove on actual implementation
            const token = result.token;
            localStorage.setItem('token', token);
            localStorage.setItem('is2FAComplete', 'true'); // remove from here if 2fa is required in the app
            setAuthState({ isAuthenticated: true, token, is2FAComplete: true }); //  is2FAComplete: false if 2fa needed in app
            // Trigger 2FA code generation and notify user...
            if (result.is2FARequired) {
                setIs2FARequired(true);
                setOtp(result.otp); // Store the OTP returned from the server
            } else {
            }
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false; // Return false on error
        }
    };


    const verify2FA = async (inputOtp: string) => {
        try {
            const result = await verifyOTP(inputOtp);
            if (result.length > 0) {
                setAuthState((prevState) => ({ ...prevState, is2FAComplete: true }));
                localStorage.setItem('is2FAComplete', 'true');
                setIs2FARequired(false);
                setOtp(null);
                return true; // Return true on success
            }
            return false; // Return false if verification fails
        } catch (error) {
            console.error('2FA verification error:', error);
            return false; // Return false on error
        }
    };

    const logout = async () => {
        await logoutUser();
        localStorage.removeItem('token');
        localStorage.removeItem('is2FAComplete');
        setAuthState({ isAuthenticated: false, is2FAComplete: false, token: null });
        setIs2FARequired(false);
        setOtp(null);
    };


    return (
        <AuthContext.Provider value={{ is2FARequired, authState, login, verify2FA, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


