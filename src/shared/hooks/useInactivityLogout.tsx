import { useEffect, useRef } from 'react';
import useAuth from '../../modules/auth/hooks/useAuth'; // Assuming you have an AuthContext

// Define inactivity timeout (e.g., 2 minutes)
const INACTIVITY_TIMEOUT = 2 * 60 * 100000; // 2 minutes in milliseconds

export const useInactivityLogout = () => {
    const { logout } = useAuth();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Function to reset the timer
    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            logout(); // Log the user out after timeout
        }, INACTIVITY_TIMEOUT);
    };

    useEffect(() => {
        // Events that reset the inactivity timer
        const events = ['mousemove', 'keydown', 'scroll', 'click'];

        // Reset timer on any of the events
        events.forEach((event) => window.addEventListener(event, resetTimer));

        // Start the inactivity timer when the component mounts
        resetTimer();

        // Cleanup on unmount
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, []);

    return null; // This hook does not render anything
};