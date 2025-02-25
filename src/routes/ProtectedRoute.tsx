import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../modules/auth/hooks/useAuth";

const ProtectedRoute = ({ children }: any) => {
    const { authState, loading } = useAuth();
    const [delayedRender, setDelayedRender] = useState(false);

    // Delay rendering ProtectedRoute until `authState` is ready
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedRender(true);
        }, 100); // Adjust the delay as needed (e.g., 100 ms)

        return () => clearTimeout(timer); // Clean up the timeout on unmount
    }, []);

    // Wait for authState to be initialized and delay render
    if (loading || !delayedRender) {
        return <div>Loading...</div>; // Render a loading indicator
    }

    // Redirect to login if not authenticated or 2FA is not complete
    if (!authState.isAuthenticated || !authState.is2FAComplete) {
        return <Navigate to="/login" />;
    }

    // Render protected content if authenticated and 2FA complete
    return children;
};

export default ProtectedRoute;