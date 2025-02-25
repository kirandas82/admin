import { Card, CardContent, CardHeader } from "@mui/material";


const Dashboard = () => (
    <Card sx={styles.content}>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>
);


const styles = {
    content: {
        bgcolor: 'neutral.light',
        color: 'neutral.main',
        borderRadius:6,
        marginTop: '2.8rem'
    },
   
}

export default Dashboard
