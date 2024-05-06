import React, { useState, useContext } from "react";
import { Box, Typography, Fab, Chip, TextField } from "@mui/material";
import { GlobalState } from "../../context/GlobalStateProvider";

const roles = [
  "Science and Research",
  "Technology and Engineering",
  "Business and Economics",
  "Arts, Humanities, and Social Sciences",
  "Healthcare and Medicine",
  "Mathematics and Analytics",
  "Communication and Media",
  "Education and Teaching",
  "Technical and Vocational Trades",
  "Natural and Environmental Studies",
  "Other",
];

const Role = (props) => {
  const [selected, setSelected] = useState([]);
  const [otherRole, setOtherRole] = useState("");
  const [other, setOther] = useState(false);

  const { profile, setProfile } = useContext(GlobalState);

  const handleClick = () => {
    setProfile({
      ...profile,
      role: selected.map((item) => roles[item]),
      otherRole: otherRole,
    });
    props.handleNext();
  };

  const handleClickChip = (index) => {
    let selectedRoles = [...selected];
    if (selectedRoles.includes(index)) {
      if (roles[index] === "Other") {
        setOther(false);
      }
      selectedRoles = selectedRoles.filter((role) => role !== index);
    } else {
      if (roles[index] === "Other") {
        setOther(true);
      }
      selectedRoles.push(index);
    }
    setSelected([...selectedRoles]);
  };

  const handleChangeOtherRole = (event) => {
    setOtherRole(event.target.value);
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
        <Typography component="h1" variant="h5" gutterBottom>
          What areas are you interested in?
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom>
          Select up to 5 areas
        </Typography>
        <div>
          {roles.map((role, index) => (
            <Chip
              key={index}
              label={role}
              variant="outlined"
              color={selected.includes(index) ? "primary" : "default"}
              onClick={() => handleClickChip(index)}
              sx={{ m: 0.5 }}
            />
          ))}
        </div>
        {other && (
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="other-role"
            label="Type interested role, if not listed above"
            name="other-role"
            autoComplete="other-role"
            className="bg-white"
            onChange={handleChangeOtherRole}
          />
        )}
      </Box>
      <Fab
        variant="extended"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        className="no-trans"
        onClick={handleClick}
      >
        <Typography component="h1" variant="body1" sx={{ mx: 5 }}>
          Save and continue
        </Typography>
      </Fab>
    </div>
  );
};

export default Role;
