import { ThemeProvider } from "@mui/material/styles";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import theme from './config/themeConfig';
import { Box, CssBaseline } from '@mui/material';
import SideNav from './layouts/SideNav';
import AppHeader from './layouts/AppHeader';
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./modules/auth/hooks/useAuth";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary";
import { useInactivityLogout } from "./shared/hooks/useInactivityLogout";

const App = () => {
  const root = document.documentElement;
  // Set CSS variables based on the themeConfig
  root.style.setProperty('--primary-color', theme.palette.primary.main);
  root.style.setProperty('--secondary-color', theme.palette.secondary.main);
  root.style.setProperty('--background-color', theme.palette.offWhite);
  root.style.setProperty('--text-color', theme.palette.primary.main);

  useInactivityLogout(); // Use the inactivity logout hook
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);  // Track submenu state

  // State to manage RTL mode
  const [isRtl, setIsRtl] = useState(false);

  const { authState } = useAuth();

  // Detect if the screen is mobile
  const handleResize = () => {
    const mobileView = window.innerWidth <= 768;
    setIsMobile(mobileView);
    // Automatically collapse the sidebar on mobile
    if (mobileView) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setToggled(!toggled);  // For mobile, toggle overlay sidebar
    } else {
      setCollapsed(!collapsed); // For desktop, collapse/expand sidebar
    }
  };

  // Toggle the submenu visibility
  const handleSubMenuToggle = () => {
    setIsSubMenuOpen((prevState) => !prevState);
  };

  // Function to toggle RTL
  const toggleRtl = () => {
    setIsRtl((prevRtl) => !prevRtl);
  };

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles.container} style={{ display: 'flex', direction: isRtl ? 'rtl' : 'ltr' }}>
          <BrowserRouter>
            {authState.isAuthenticated && authState.is2FAComplete && (
              <SideNav
                collapsed={collapsed}
                toggled={toggled}
                toggleSidebar={toggleSidebar}
                isRtl={isRtl}
                onSubMenuToggle={handleSubMenuToggle}  // Pass submenu toggle handler to SideNav
                isSubMenuOpen={isSubMenuOpen}  // Pass submenu open state to SideNav
              />
            )}
            <Box component={"main"} sx={styles.mainSession} style={{ flex: 1, position: 'relative' }}>
              {authState.isAuthenticated && authState.is2FAComplete && <Box sx={styles.backgroundBox}></Box>}
              <ErrorBoundary>
                {authState.isAuthenticated && authState.is2FAComplete && <AppHeader toggleSidebar={toggleSidebar} toggleRtl={toggleRtl} isRtl={isRtl} />}
              </ErrorBoundary>
              <Box style={{ flex: 1, padding: '0px', margin: 4, position: 'relative', zIndex: 2 }}>
                <AppRoutes />
              </Box>
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    bgcolor: 'offWhite',
    height: 'calc(100% - 64px)', // Corrected CSS variable for height
  },
  mainSession: {
    p: 4,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  backgroundBox: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '50%',
    backgroundColor: '#b4b5da',
    zIndex: 1,
    opacity: 0.5,
    borderBottomLeftRadius: '80px',
    borderBottomRightRadius: '80px',
  },
};

export default App;
