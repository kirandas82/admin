import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../modules/auth/hooks/useAuth';

function SideNav({  collapsed, toggled, toggleSidebar, isRtl, onSubMenuToggle, isSubMenuOpen  }: any) {
    const theme = useTheme()
    const location = useLocation()
    const { t } = useTranslation();

    const { logout } = useAuth();
    const handleLogout= async () => {
        await logout();
      };
    return (
        <Sidebar style={{
            background: theme.palette.white,
            height: '95vh', top: 'auto',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            margin: 10,
            fontSize: '1rem',
            // boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
            boxShadow:'0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
        }}
            breakPoint='xs' 
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={() => toggleSidebar(false)}  // Close sidebar on backdrop click in mobile view
            rtl={isRtl} width='300px'>
            <Menu menuItemStyles={{
                button: ({ active }) => {
                    return {
                        backgroundColor: active ? theme.palette.primary.main : undefined,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main, // Customize hover color
                            border: '5px solid #ffffff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            height: '60px',
                            color:theme.palette.white
                        },
                        color: active ? theme.palette.white : undefined,
                        fontWeight: active ? '900' : undefined,
                        border:  '5px solid #ffffff',
                        borderRadius: active ? '16px' : undefined,
                        overflow: active ? 'hidden' : undefined,
                        height: '60px'
                    }
                }
            }}>
                
                <Box component={'img'} sx={styles.appLogo} src='src/assets/images/logo.png' className='logo'/>
                {/* Dashboard */}
                <MenuItem active={location.pathname === '/dashboard'} component={<Link to='/dashboard' />} icon={<DashboardOutlinedIcon />}>
                    <Typography variant='body2'>{t('sidenav.db.label')}</Typography>
                </MenuItem>
                 {/* Setup and Configuration */}
                <SubMenu label={'Setup and Configuration'} 
                open={isSubMenuOpen} // Control submenu visibility based on state
                rootStyles={{
                    li: { fontSize: '14px' }
                }} icon={<DvrOutlinedIcon />} 
                onClick={onSubMenuToggle} /*Pass toggle function} */>
                    <MenuItem active={location.pathname === '/artwork'} component={<Link to='/artwork' />}>{'Artwork Configuration'}</MenuItem>
                    <MenuItem active={location.pathname === '/limit-profile'} component={<Link to='/limit-profile' />}>{'Limit Profile Configuration'}</MenuItem>
                    <MenuItem active={location.pathname === '/card-vendors'} component={<Link to='/card-vendors' />}>{'Card Perso Vendor Configuration'}</MenuItem>
                    <MenuItem active={location.pathname === '/bin-profile'} component={<Link to='/bin-profile' />}>{'Bin Profile Configuration'}</MenuItem>
                    <MenuItem active={location.pathname === '/fee-profile'} component={<Link to='/fee-profile' />}>{'Fee Profile Configuration'}</MenuItem>
                    <MenuItem active={location.pathname === '/card-product'} component={<Link to='/card-product' />}>{'Card Product Configuration'}</MenuItem>
                </SubMenu> 
                <MenuItem  icon={<LogoutIcon />} onClick={handleLogout} >
                    <Typography variant='body2'>Sign Out</Typography>
                </MenuItem>
            </Menu>
            {/* <IconButton onClick={handleLogout}  title='logout' color='primary'>
                    <LogoutIcon />
            </IconButton> */}
        </Sidebar>
    )
}

const styles = {
    pannelContainer: {
        bgcolor: 'white',
        height: '100vh',
        top: 'auto',
        borderRadius: 2
    },
    appLogo: {
        display: 'block',
        borderRadius: 2,
        width: '270px',
        cursor: 'pointer',
        mt: 2,
        ml: 'auto',
        mr: 'auto',
        mb: 2,
    }
}


export default SideNav