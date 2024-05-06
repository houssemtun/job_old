import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip, Box } from "@mui/material";
import Status from "../../components/dashboard/Status";
import Todo from "../../components/dashboard/Todo";
import JobCard from "../../components/dashboard/JobCard";
import Dashboard from "./index";
import {
  getJobList as getJobListApi,
  postApplication,
} from "../../helper/apiHelper";

const VIEW_MORE_COUNT = 8;

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [jobList, setJobList] = useState([]);
  const [viewMoreSteps, setViewMoreSteps] = useState(1);
  const [viewMoreDisabled, setViewMoreDisabled] = useState(false);

  const getJobList = async () => {
    const data = await getJobListApi();
    if (!data) {
      return;
    }
    setJobList(data);
  };

  const changeStatus = (_status, _id) => {
    let newList = jobList.map((job) => {
      if (job.listing_uuid === _id) job.listing_recom.match_status = _status;
      return job;
    });
    setJobList(newList);
  };

  const onClickLike = async (_id) => {
    try {
      const response = await fetch("/api/v1/application/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_uuid: _id,
          applic_status: "Matched",
          applic_notes: "",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        let newList = jobList.map((job) => {
          if (job.listing_uuid === _id)
            job.listing_recom.match_status = "Matched";
          return job;
        });
        setJobList(newList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDislike = (_id) => {
    let newList = jobList.map((job) => {
      if (job.listing_uuid === _id) job.listing_recom.match_status = "Dislike";
      return job;
    });
    setJobList(newList);
  };

  const onClickViewMoreSteps = () => {
    const countOfSearched = jobList.filter(
      (job) => job.listing_recom.match_status === "default"
    ).length;
    if (VIEW_MORE_COUNT * viewMoreSteps < countOfSearched) {
      setViewMoreSteps(viewMoreSteps + 1);
    }
  };

  useEffect(() => {
    getJobList();
  }, []);

  useEffect(() => {
    const countOfSearched =
      jobList.length > 0
        ? jobList.filter((job) => job.listing_recom.match_status === "default")
            .length
        : 0;
    if (VIEW_MORE_COUNT * viewMoreSteps > countOfSearched) {
      setViewMoreDisabled(true);
    } else {
      setViewMoreDisabled(false);
    }
  }, [jobList, viewMoreSteps]);

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
              Hello, Max 👋
            </Typography>
            <Typography
              color="gray"
              variant="body2"
              gutterBottom
              align="left"
              sx={{ mb: 5 }}
            >
              Here's what's happenning today.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Todo />
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                  }}
                >
                  <Status />
                </Paper>
              </Grid>
            </Grid>
            <div>
              <Typography
                component="h2"
                variant="h5"
                gutterBottom
                align="left"
                fontWeight={700}
                sx={{ mt: 5 }}
              >
                Top jobs that match your profile
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {jobList.length > 0 &&
                  jobList
                    .filter(
                      (job) => job.listing_recom.match_status === "default"
                    )
                    .slice(0, VIEW_MORE_COUNT * viewMoreSteps)
                    .map((job, index) => (
                      <Grid key={index} item xs={12} md={4} lg={3}>
                        <JobCard
                          setStatus={changeStatus}
                          onClickLike={onClickLike}
                          onClickDislike={onClickDislike}
                          data={job}
                          searched
                        />
                      </Grid>
                    ))}
              </Grid>
            </div>
            <Box sx={{ display: "flex", justifyContent: "start", mt: 3 }}>
              <Chip
                label="View all top matches"
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
                clickable
                disabled={viewMoreDisabled}
                onClick={onClickViewMoreSteps}
              />
            </Box>
          </Container>
        </Box>
      )}
    </Dashboard>
  );
};

export default Home;
