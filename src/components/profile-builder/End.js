import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { GlobalState } from "../../context/GlobalStateProvider";
import { postProfile as postProfileApi } from "../../helper/apiHelper";

const End = () => {
  const history = useNavigate();
  const { profile } = useContext(GlobalState);
  console.log(profile);

  useEffect(() => {
    const timeout = setTimeout(() => {
      history("/dashboard-home");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [history]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 5, width: 0.7 }}
          gutterBottom
        >
          <b>Bravo!!!</b>
        </Typography>
        <CircularProgress />
        <Typography
          variant="body1"
          color="gray"
          sx={{ mt: 5, width: 0.7 }}
          gutterBottom
        >
          Hold tight - we are setting you up and finding you the best job
          matches...
        </Typography>
      </Box>
    </div>
  );
};

export default End;
