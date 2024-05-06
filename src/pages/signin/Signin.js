import React, { useState } from "react";
import { Fab } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LeftSide from "../../components/auth/LeftSide";
import Google from "../../assets/img/signin/google.png";
import Github from "../../assets/img/signin/github.png";
import LinkedIn from "../../assets/img/signin/linkedin.png";
import { checkApplicationProfile } from "../../helper/apiHelper";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const history = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    history("/profile");
  };

  return (
    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
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
            label="Enter your password"
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
        <Fab
          variant="extended"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          className="no-trans full-width"
          onClick={handleLogin}
        >
          Login
        </Fab>
      </Grid>
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
    </Box>
  );
};

const SignIn = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const history = useNavigate();
  const handleWithEmail = () => {
    history("/signup");
  };
  const handleShowLoginForm = () => {
    setShowLoginForm(true);
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
          <Fab
            variant="extended"
            color="white"
            sx={{ mt: 3, mb: 2 }}
            className="no-trans full-width bg-white"
          >
            <Avatar
              sx={{ width: "30px", height: "30px", mr: 2 }}
              alt="Google"
              src={Google}
            />
            <Typography component="h1" variant="body1">
              Continue with Google (coming soon)
            </Typography>
          </Fab>
          <Fab
            variant="extended"
            color="white"
            sx={{ mt: 3, mb: 2 }}
            className="no-trans full-width bg-white"
          >
            <Avatar
              variant="square"
              sx={{ width: "30px", height: "30px", mr: 2 }}
              alt="LinkedIn"
              src={LinkedIn}
            />
            <Typography component="h1" variant="body1">
              Continue with LinkedIn (coming soon)
            </Typography>
          </Fab>
          <Fab
            variant="extended"
            color="white"
            sx={{ mt: 3, mb: 2 }}
            className="no-trans full-width bg-white"
          >
            <Avatar
              sx={{ width: "30px", height: "30px", mr: 2 }}
              alt="Github"
              src={Github}
            />
            <Typography component="h1" variant="body1">
              Continue with Github (coming soon)
            </Typography>
          </Fab>
          <Typography component="h1" variant="body2">
            Or
          </Typography>
          {showLoginForm ? (
            <LoginForm />
          ) : (
            <Fab
              variant="extended"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              className="no-trans full-width"
              onClick={handleShowLoginForm}
            >
              <Typography component="h1" variant="body1" color="white">
                Continue with Email
              </Typography>
            </Fab>
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography fontSize={12}>
                Don't have an account yet?{" "}
                <Link to="/signup" variant="body2">
                  Create one
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
