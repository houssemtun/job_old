import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Fab } from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { GlobalState } from "../../context/GlobalStateProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { getListSkills } from "../../helper/apiHelper"; // TODO this is unused
import Skills from "../../utils/skills.json";
const Job = (props) => {
  const skills = Skills;
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  useEffect(() => {
    setHardSkills(
      skills
        .filter((skill_obj) => skill_obj.skill_type == "hardskill")
        .map((skill_obj) => skill_obj.skill)
    );
    setSoftSkills(
      skills
        .filter((skill_obj) => skill_obj.skill_type == "softskill")
        .map((skill_obj) => skill_obj.skill)
    );
  }, []);
  const [recentJob, setRecentJob] = React.useState("");
  const { profile, setProfile } = useContext(GlobalState);
  const handleChangeRecentJob = (event) => {
    setRecentJob(event.target.value);
  };

  const handleChangeHSkills = (_, val) => {
    setProfile({
      ...profile,
      hskill: val,
    });
  };

  const handleChangeSSkills = (_, val) => {
    setProfile({
      ...profile,
      sskill: val,
    });
  };

  const handleClick = () => {
    setProfile({
      ...profile,
      recentJob,
    });
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
          <b>What do you currently do?</b>
        </Typography>

        <Box component="form" noValidate sx={{ mt: 5 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={10}>
              <Typography component="h1" variant="body1" align="left">
                Most recent job title?
              </Typography>
              <TextField
                sx={{ mt: 2 }}
                required
                fullWidth
                id="title"
                label="Type your job title"
                name="title"
                autoComplete="title"
                className="bg-white"
                onChange={handleChangeRecentJob}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography component="h1" variant="h5" gutterBottom>
                What hard skills do you have or enjoy working with?
              </Typography>
              <Typography variant="caption" color="gray" gutterBottom>
                Select as many as possible
              </Typography>
              <FormControl sx={{ m: 1, maxWidth: 500, width: "100%", mb: 3 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  name="skill"
                  options={hardSkills}
                  freeSolo
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  filterOptions={(options, params) => {
                    const filtered = params.inputValue
                      ? hardSkills.filter((option) =>
                          option
                            ?.toLowerCase()
                            .includes(params.inputValue?.toLowerCase())
                        )
                      : options.slice(0, 5);
                    return filtered;
                  }}
                  onChange={handleChangeHSkills}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search all skills..."
                      placeholder="Choose skills"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography component="h1" variant="h5" gutterBottom>
                What soft skills do you have or enjoy working with?
              </Typography>
              <Typography variant="caption" color="gray" gutterBottom>
                Select as many as possible
              </Typography>
              <FormControl sx={{ m: 1, maxWidth: 500, width: "100%", mb: 3 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  name="skill"
                  options={softSkills}
                  freeSolo
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  filterOptions={(options, params) => {
                    const filtered = params.inputValue
                      ? softSkills.filter((option) =>
                          option
                            ?.toLowerCase()
                            .includes(params.inputValue?.toLowerCase())
                        )
                      : options.slice(0, 5);
                    return filtered;
                  }}
                  onChange={handleChangeSSkills}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search all skills..."
                      placeholder="Choose skills"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Fab
                variant="extended"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                className="no-trans full-width"
                onClick={handleClick}
              >
                <Typography component="h1" variant="body1">
                  Save and continue
                </Typography>
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Job;
