
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';

import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';

import { useTranslation } from 'react-i18next';
import zIndex from '@mui/material/styles/zIndex';

const AppHeader = ({ toggleSidebar, toggleRtl, isRtl }: any) => {
    
    const { t, i18n } = useTranslation(); // TypeScript will infer types automatically
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }; 

    return (
        <AppBar position='relative' sx={styles.appBar}>
            <Toolbar sx={styles.toolBar}>
                <IconButton onClick={toggleSidebar} color='primary'>
                    <MenuTwoToneIcon></MenuTwoToneIcon>
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton title='Notification' color='primary'>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton title='settings' color='primary'>
                    <SettingsIcon />
                </IconButton>
               
                {/* <button onClick={toggleRtl}>
                    {isRtl ? 'Switch to LTR' : 'Switch to RTL'}
                </button> */}
                {/* <h1>{t('welcome_message')}</h1> */}
                {/* <section className="languages">
                    <button onClick={() => changeLanguage('en')}>en</button>
                    <button onClick={() => changeLanguage('ar')}>ar</button>
                </section> */}
                <Box sx={styles.userProfile}>
                    <Avatar alt="Kirandas" src="/static/images/avatar/1.jpg" />
                    <Typography sx={styles.userName}>Kirandas</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}



const styles = {
    appBar: {
        bgcolor: 'neutral.light',
        color: 'neutral.main',
        borderRadius:6,
        zIndex: '2 !important'
    },
    userImage:{
        width: '50px', /* Set size of the image */
        height: '50px', /* Set size of the image */
        borderRadius: '50%', /* Makes the image a circle */
        objectFit: 'cover', /* Ensures image fits the circle */
        marginRight: '10px' /* Adds space between the image and name */
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
    userName:{
         color: 'primary.main',
         fontWeight:'bold',
         paddingLeft:'10px'
    },
    toolBar:{
        height: '94px'
    }

    
}

export default AppHeader

