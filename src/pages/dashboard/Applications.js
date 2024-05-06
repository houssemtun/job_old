import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Chip, Box } from "@mui/material";
import JobCard from "../../components/dashboard/JobCard";
import Dashboard from "./index";
import { getApplicationStatus } from "../../helper/apiHelper";

const columns = [
  { label: "Matches", bgColor: "#f0e7f6", status: "Matched" },
  { label: "Applied", bgColor: "#f5d98e", status: "Applied" },
  { label: "Interviewing", bgColor: "#74a4f8", status: "Interviewing" },
  { label: "Offers", bgColor: "lightgreen", status: "Offered" },
  { label: "Archived", bgColor: "#e1e4e8", status: "Archived" },
];

const Applications = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [appList, setAppList] = useState([]);

  const getAppList = async () => {
    const data = await getApplicationStatus();
    if (!data) {
      return;
    }
    setAppList(data);
  };

  const changeStatus = (_status, _id) => {
    let newList = appList.map((job) => {
      if (job.id === _id) job.applic_status = _status;
      return job;
    });
    setAppList(newList);
  };

  useEffect(() => {
    getAppList();
  }, []);

  return (
    <Dashboard>
      {1 == 1 && (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              component="h2"
              variant="h4"
              gutterBottom
              align="left"
              fontWeight={700}
              sx={{ mt: 5 }}
            >
              Your Applications
            </Typography>
            <Typography
              color="gray"
              variant="body2"
              gutterBottom
              align="left"
              sx={{ mb: 5 }}
            >
              Kanban board to keep track of your applications
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3, boxSizing: "border-box" }}>
              {columns.map((item, index) => {
                const filtedJob = appList.filter(
                  (job) => job.applic_status === item.status
                );
                return (
                  <Grid key={index} item xs={12} md={4} lg={3}>
                    <Chip
                      label={item.label}
                      variant="filled"
                      sx={{ bgcolor: item.bgColor, mb: 2 }}
                      clickable
                    />
                    {filtedJob.map((job, _index) => (
                      <JobCard
                        key={_index}
                        setStatus={changeStatus}
                        data={job.listing}
                      />
                    ))}
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>
      )}
    </Dashboard>
  );
};

export default Applications;
