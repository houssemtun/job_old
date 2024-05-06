import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icons from "../../assets/img/leftside/HomeScreenGraphik.svg";

const LeftSide = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="full-height"
      marginX={10}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
        Organize your job search, applications and interviews on one platform
      </Typography>
      <img alt="Icons" src={Icons} width="350px"></img>
    </Box>
  );
};

export default LeftSide;
