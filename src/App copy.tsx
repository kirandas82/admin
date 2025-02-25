import { ThemeProvider } from "@mui/material/styles";
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import theme from './config/themeConfig'
import { Box, CssBaseline } from '@mui/material'
import SideNav from './layouts/SideNav'
import AppHeader from './layouts/AppHeader'
import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./modules/auth/hooks/useAuth";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // State to manage RTL mode
  const [isRtl, setIsRtl] = useState(false);

   const { authState } = useAuth();
  //  console.log(isAuthenticated);

  // Detect if the screen is mobile
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setToggled(!toggled);  // For mobile, toggle overlay sidebar
    } else {
      setCollapsed(!collapsed); // For desktop, collapse/expand sidebar
    }
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
          <ErrorBoundary>
          {authState.isAuthenticated && <AppHeader toggleSidebar={toggleSidebar} toggleRtl={toggleRtl} isRtl={isRtl} />}</ErrorBoundary>
          <Box sx={styles.container} style={{ display: 'flex', direction: isRtl ? 'rtl' : 'ltr' }}>
            <BrowserRouter>
            {authState.isAuthenticated && <SideNav collapsed={collapsed} toggled={toggled} toggleSidebar={toggleSidebar} isRtl={isRtl} /> }
              <Box component={"main"} sx={styles.mainSession} style={{ flex: 1, padding: '20px' }}>
              {/* <Box style={{ flex: 1, padding: '20px' }}> */}
              {/* {isAuthenticated &&  <h1>{isRtl ? 'Right-to-Left Layout' : 'Left-to-Right Layout'}</h1> }
                {isAuthenticated &&   <p>This is the main content area. Adjust the sidebar by toggling RTL mode.{isRtl}</p> } */}
              {/* </Box> */}
                <AppRoutes />
              </Box>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'cal(100%-64)'
  },
  mainSession: {
    p: 4,
    width: '100%',
    heigh: '100%',
    overflow: 'auto'
  }
}

export default App
