import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LeftSide from "../../components/auth/LeftSide";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    // Load cookies from localStorage or another storage mechanism
    const savedCookies = localStorage.getItem("savedCookies");
    if (savedCookies) {
      document.cookie = savedCookies;
    }
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setError("");
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (isChecked) {
      try {
        const response = await fetch("/api/v1/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_addr: email,
            password: password,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.registered) {
            // If signup is successful, navigate to the profile page
            history("/profile");
          } else {
            setError("Registration failed. User is already registered.");
          }
        } else {
          setError("HTTP error! Please try again later.");
        }
      } catch (error) {
        setError("Error during login. Please try again later.");
      }
    } else {
      setError("Please accept the terms and conditions."); // Set error if checkbox is not checked
    }
  };

  return (
    <Grid container className="full-height bg-light-blue">
      <Grid item xs={12} md={4} className="bg-blue">
        <LeftSide />
      </Grid>
      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
          }}
          className="full-height"
        >
          <Typography component="h1" variant="h4">
            Welcome to Jobmatch
          </Typography>
          <p>Get started with your all-in-one career OS.</p>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignup}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  className="bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Create password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  className="bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <Typography fontSize={12}>
                      By signing up, I agree to the{" "}
                      <a href="/#">Terms of Use </a>
                      and <a href="/#">Privacy Policy</a>.
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Fab
              variant="extended"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              className="no-trans full-width"
              onClick={handleSignup}
            >
              Create free account
            </Fab>
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography fontSize={12}>
                  Already have an account?{" "}
                  <Link to="/signin" variant="body2">
                    Log in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Signup;
