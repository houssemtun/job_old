import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Fab } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, OutlinedInput } from "@mui/material";
import city from "../../utils/cities.json";
import { GlobalState } from "../../context/GlobalStateProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cities = city.cities;

const levels = [
  "Internship",
  "Trainee program",
  "Working student",
  "Vocational training",
  "Side job",
  "Entry-level/graduate",
  "Junior (1-2 years)",
  "Mid-level (3-4 years)",
  "Senior (5-8 years)",
  "Expert & Leadership (9+ years)",
];

const workingHours = ["10-15", "15-20", "20-30", "30-40"];

const places = ["Remote", "Hybrid", "Office"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Common = (props) => {
  const theme = useTheme();
  const [commonData, setCommonData] = React.useState({
    cities: [],
    level: [],
    salary: [],
    place: [],
  });
  const { profile, setProfile } = useContext(GlobalState);

  const handleClick = () => {
    setProfile({
      ...profile,
      city: commonData.cities,
      level: commonData.level,
      workingHours: commonData.salary,
      place: commonData.place,
    });
    props.handleNext();
  };

  const handleChange = (event, val = "hi") => {
    const {
      target: { value, name },
    } = event;
    setCommonData({
      ...commonData,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeCity = (_, val) => {
    setCommonData({
      ...commonData,
      cities: val,
    });
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
          Where would you like to work?
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom>
          Select as many locations as you want.
        </Typography>
        <FormControl sx={{ m: 1, maxWidth: 500, width: "100%", mb: 3 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            name="skill"
            options={cities}
            freeSolo
            getOptionLabel={(option) => option}
            filterSelectedOptions
            filterOptions={(options, params) => {
              const filtered = params.inputValue
                ? cities.filter((option) =>
                    option
                      ?.toLowerCase()
                      .includes(params.inputValue?.toLowerCase())
                  )
                : options.slice(0, 5);
              return filtered;
            }}
            onChange={handleChangeCity}
            renderInput={(params) => (
              <TextField {...params} label=" " placeholder="choose location" />
            )}
          />
        </FormControl>
        <Typography component="h1" variant="h5" gutterBottom>
          What level of roles are you looking for?
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom>
          Select up to 2 levels.
        </Typography>
        <FormControl sx={{ m: 1, width: 300, mb: 3 }}>
          <Select
            name="level"
            multiple
            displayEmpty
            value={commonData.level}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography variant="body2" color="gray" align="left">
                    Choose interested level
                  </Typography>
                );
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Choose interested level</em>
            </MenuItem>
            {levels.map((level) => (
              <MenuItem
                key={level}
                value={level}
                style={getStyles(level, commonData.cities, theme)}
              >
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography component="h1" variant="h5" gutterBottom>
          How many hours do you like to work?
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom>
          Select up to 2 ranges.
        </Typography>
        <FormControl sx={{ m: 1, width: 300, mb: 3 }}>
          <Select
            name="salary"
            multiple
            displayEmpty
            value={commonData.salary}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography variant="body2" color="gray" align="left">
                    Choose interested in hourly range
                  </Typography>
                );
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Choose interested in working range</em>
            </MenuItem>
            {workingHours.map((wh) => (
              <MenuItem
                key={wh}
                value={wh}
                style={getStyles(wh, commonData.salary, theme)}
              >
                {wh}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography component="h1" variant="h5" gutterBottom>
          How would you like to work?
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom>
          Select as many as possible.
        </Typography>
        <FormControl sx={{ m: 1, width: 300, mb: 3 }}>
          <Select
            name="place"
            multiple
            displayEmpty
            value={commonData.place}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography variant="body2" color="gray" align="left">
                    Choose working style
                  </Typography>
                );
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Choose interested locations or remote</em>
            </MenuItem>
            {places.map((place) => (
              <MenuItem
                key={place}
                value={place}
                style={getStyles(place, commonData.place, theme)}
              >
                {place}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        sx={{ mt: 3, mb: 2, width: 300 }}
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

export default Common;
