// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { Link as RouterLink,useNavigate,NavLink,useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();

  if(localStorage.getItem('token')==='llll'){
    navigate('/login', { replace: true });
  }
  const [premiumContent, setPremiumContent] = useState([]);
    const [freeContent, setfreeContent] = useState([]);

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/orderreport`;
        const bodyFormData = new FormData();
        axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setPremiumContent(outlook.data);
                setfreeContent(outlook.data);
            })
    }, []);
  return (
    <Page title="Dashboard | SoundChatRadio">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales props={freeContent}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers props={freeContent}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders props={freeContent}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports props={freeContent}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
