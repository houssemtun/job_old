import React from "react";
import { Box, Typography, Fab } from "@mui/material";

const Start = (props) => {
  const handleClick = () => {
    props.handleNext();
  };

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
        <Typography component="h1" variant="h5">
          <b>Awesome</b>
        </Typography>
        <p>Your email has been verified!</p>
        <p>Next step is to get to know you better...</p>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        className="no-trans full-width"
        onClick={handleClick}
      >
        <Typography component="h1" variant="body1">
          Let's get started
        </Typography>
      </Fab>
    </div>
  );
};

export default Start;
