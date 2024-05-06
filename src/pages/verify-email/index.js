import React from "react";
import { Fab } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import LeftSide from "../../components/auth/LeftSide";

const VerifyEmail = () => {
  const history = useNavigate()
  const handleClick = () => {
    history("/profile");
  }

  return (
    <Grid container className="full-height bg-light-blue">
      <Grid item xs={12} md={4} className="bg-blue">
        <LeftSide />
      </Grid>
      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 5, 
          }}
          className="full-height"
        >
          <Typography component="h1" variant="h4">
            Welcome to Joborga
          </Typography>
          <p>Get started with your all-in-one career OS.</p>
          <Typography component="h1" variant="body1" sx={{ mt: 5 }}>
            We've sent an email to <b>max.müller@gmail.com</b>. Please check your inbox to activate your account.
          </Typography>
          <Fab variant="extended" color="white" sx={{ mt: 3, mb: 2 }}
            className="no-trans full-width bg-white border-primary" 
            onClick={handleClick}>
            <Typography component="h1" variant="body1" color="primary">
              Resend email
            </Typography>
          </Fab>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography fontSize={12}>
                Already have an account? <Link to="/signin" variant="body2">Log in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        </Grid>
    </Grid>
  );
};

export default VerifyEmail;