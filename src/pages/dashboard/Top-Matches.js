import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chip, Box, Divider } from '@mui/material';
import { TextField, MenuItem, styled } from "@mui/material";
import { FormControl, InputAdornment, Fab } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from '../../components/dashboard/JobCard';
import Dashboard from "./index";
import { getJobList as getJobListApi } from "../../helper/apiHelper";

const roles = [
  {
    value: 'Accounting',
    label: 'Accounting',
  },
  {
    value: 'AI & Machine Learning',
    label: 'AI & Machine Learning',
  },
  {
    value: 'Data & Analytics',
    label: 'Data & Analytics',
  },
  {
    value: 'IT & Security',
    label: 'IT & Security',
  },
];

const levels = [
  {
    value: 'Entry',
    label: 'Entry',
  },
  {
    value: 'Junior',
    label: 'Junior',
  },
  {
    value: 'Senior',
    label: 'Senior',
  },
];

const locations = [
  {
    value: 'Remote',
    label: 'Remote',
  },
  {
    value: 'Office',
    label: 'Office',
  },
];

const RoundedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px', // Adjust the value as per your preference
    minWidth: '150px'
  },
});

const TopMatches = () => {
  const [jobList, setJobList] = useState([]);

  const getJobList = async () => {
    const data = await getJobListApi();
    if (!data){
      return;
    }
    setJobList(data.jobList);
  }

  const changeStatus = (_status, _id) => {
    let newList = jobList.map(job => {
      if (job.id === _id) job.status = _status
      return job;
    })
    setJobList(newList);
  }

  useEffect(() => {
    getJobList()
  }, []);

  return (
    <Dashboard>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography component="h2" variant="h4" gutterBottom align='left' 
          fontWeight={700}
          sx={{ mt: 5 }}>
                  Your top job matches
          </Typography>
          <Typography color="gray" variant="body2" gutterBottom align='left' 
          sx={{ mb: 5 }}>
                  Here's what's happeniing today.
          </Typography>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column',}}>
            <FormControl sx={{ mb:3, width: '100%', maxWidth: '300px' }} variant="outlined">
              <RoundedTextField
                InputProps={{
                  endAdornment: (<InputAdornment position="end">
                                <Fab color="primary" aria-label="search" size="small">
                                  <SearchIcon/>
                                </Fab>
                                </InputAdornment>)
                }}
              />
            </FormControl>
            <Grid container gap={2}>
              <RoundedTextField select variant="outlined" label="Type of role" defaultValue="" size="small">
                <MenuItem disabled value="">
                  <em>Type of role</em>
                </MenuItem>
                {roles.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RoundedTextField>
              <RoundedTextField select variant="outlined" label="Level"  defaultValue="" size="small">
                <MenuItem disabled value="">
                  <em>Level</em>
                </MenuItem>
                {levels.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RoundedTextField>
              <RoundedTextField select variant="outlined" label="Location"  defaultValue="" size="small">
                <MenuItem disabled value="">
                  <em>Location</em>
                </MenuItem>
                {locations.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RoundedTextField>
              <Divider orientation="vertical" flexItem />
              <Chip label="Growth & management" variant="outlined" 
                sx={{minHeight: 40, borderRadius: 20}} clickable/>
              <Chip label="Remote" variant="outlined" 
                sx={{minHeight: 40, borderRadius: 20}} clickable/>
              <Chip label=">60,000" variant="outlined" 
                sx={{minHeight: 40, borderRadius: 20}} clickable/>
              <Chip label="Data & Analytics" variant="outlined" 
                sx={{minHeight: 40, borderRadius: 20}} clickable/>
              <Divider orientation="vertical" flexItem />
              <Chip icon={<TuneIcon />} label="Filters" variant="outlined" 
                sx={{minHeight: 40, borderRadius: 20}} clickable/>
            </Grid>
          </Paper>

          <Grid container spacing={3} sx={{ mt: 3}}>
            {
              jobList.filter(job => job.status === 'Matched').map((job, index) => (
                <Grid key={index} item xs={12} md={4} lg={3}>
                  <JobCard setStatus={changeStatus} data={job} />
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Box>
    </Dashboard>
  );
};

export default TopMatches;