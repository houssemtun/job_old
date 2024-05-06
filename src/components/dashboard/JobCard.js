import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EuroIcon from "@mui/icons-material/Euro";
import PeopleIcon from "@mui/icons-material/People";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { List, ListItem } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import Grid from "@mui/material/Grid";

const options = ["Matched", "Applied", "Interviewing", "Offered", "Archived"];

const ITEM_HEIGHT = 48;

export default function JobCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showJobDetail, setShowJobDetail] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const setStatus = (status) => {
    console.log(status);
    if (props.setStatus) {
      console.log("X");
      props.setStatus(status, props.data.listing_uuid);
      console.log(props);
    }
    handleClose();
  };
  const onClickLike = () => {
    if (props.onClickLike) {
      props.onClickLike(props.data.listing_uuid);
    }
  };
  const onClickDislike = () => {
    if (props.onClickDislike) {
      props.onClickDislike(props.data.listing_uuid);
    }
  };

  const JobDetail = (
    <Box
      sx={{ maxWidth: 700, padding: "30px", pt: "30px" }}
      role="presentation"
    >
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => {
          setShowJobDetail(false);
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h4"
        fontWeight={500}
        gutterBottom
        sx={{ mt: "20px" }}
      >
        {props.data.title}
      </Typography>
      <Divider />
      <Box sx={{ my: "10px" }} px={{ xs: 0, sm: 2, md: 3 }}>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ my: "10px" }}
        >
          {props.data.detail?.labels &&
            props.data.detail?.labels.map((item, index) => (
              <Chip
                key={index}
                color="primary"
                label={item}
                size="large"
                sx={{ mx: "5px", px: "5px", my: "5px" }}
              />
            ))}
        </Grid>
      </Box>
      <Divider />
      <Box px={{ xs: 0, sm: 2, md: 3 }}>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ my: "10px" }}
        >
          <Typography
            variant="body2"
            component={"div"}
            gutterBottom
            sx={{ mx: "10px" }}
          >
            <HistoryIcon sx={{ mr: "5px" }} />
            {`Posted Date: ${props.data.created_at}`}
          </Typography>
          <Typography
            variant="body2"
            component={"div"}
            gutterBottom
            sx={{ mx: "10px" }}
          >
            <LocationOnIcon sx={{ mr: "5px" }} />
            {`Location: ${props.data?.location}`}
          </Typography>
          <Typography
            variant="body2"
            component={"div"}
            gutterBottom
            sx={{ mx: "10px" }}
          >
            <BusinessIcon sx={{ mr: "5px" }} />
            {`Company: ${props.data?.company}`}
          </Typography>
        </Grid>
      </Box>
      <Box>
        <Typography
          variant="body1"
          fontWeight={1000}
          gutterBottom
          sx={{ mb: "10px", mt: "20px" }}
        >
          {`Description: ${props.data?.description}`}
        </Typography>
        <Typography variant="body1" fontWeight={500} gutterBottom>
          {props.data.descripton}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Card sx={{ minWidth: 275, p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              sx={{
                bgcolor: red[500],
                width: 20,
                height: 20,
                fontSize: 10,
                mr: 1,
              }}
              aria-label="recipe"
            >
              {props.data.company.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              {props.data.company}
            </Typography>
          </Box>
          <Typography variant="caption" color="gray" gutterBottom>
            {`${props.data.location}(${props.data.remote_fraction})`}
          </Typography>
          {!props.searched && (
            <IconButton
              aria-label="settings"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )}
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === props.data.applic_status}
                onClick={(e) => {
                  setStatus(option, e);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setShowJobDetail(true);
          }}
        >
          <Typography
            align="left"
            variant="body1"
            fontWeight={500}
            gutterBottom
          >
            {props.data.title}
          </Typography>
          <Typography align="left" variant="body2" color="gray">
            {props.data.description.slice(0, 90)}...
          </Typography>
        </Box>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 0,
          }}
        >
          <Chip
            icon={<EuroIcon />}
            size="small"
            sx={{ bgcolor: "white" }}
            label={
              <Typography align="left" variant="caption" color="gray">
                {props.data.salary_from}-{props.data.salary_upto}
              </Typography>
            }
          />
          <Chip
            icon={<PeopleIcon />}
            size="small"
            sx={{ bgcolor: "white" }}
            style={{ margin: "0" }}
            label={
              <Typography align="left" variant="caption" color="gray">
                {props.data.people}
              </Typography>
            }
          />
          <Chip
            icon={<CheckCircleIcon />}
            size="small"
            sx={{ bgcolor: "lightgreen" }}
            style={{ margin: "0" }}
            label={
              <Typography align="left" variant="caption" color="gray">
                Hiring
              </Typography>
            }
          />
        </CardActions>
        {props.searched && (
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pl: 0,
              pr: 0,
            }}
          >
            <Chip
              icon={<ThumbUpIcon />}
              size="small"
              sx={{ bgcolor: "white" }}
              clickable
              onClick={onClickLike}
              label={
                <Typography align="left" variant="caption" color="gray">
                  {`like`}
                </Typography>
              }
            />
            <Chip
              icon={<VisibilityIcon />}
              size="small"
              sx={{ bgcolor: "white" }}
              clickable
              onClick={() => setShowJobDetail(true)}
              label={
                <Typography align="left" variant="caption" color="gray">
                  {`view`}
                </Typography>
              }
            />
            <Chip
              icon={<ThumbDownIcon />}
              size="small"
              sx={{ bgcolor: "white" }}
              clickable
              onClick={onClickDislike}
              style={{ margin: "0" }}
              label={
                <Typography align="left" variant="caption" color="gray">
                  {`dislike`}
                </Typography>
              }
            />
          </CardActions>
        )}
      </Card>
      <Drawer
        anchor={"right"}
        open={showJobDetail}
        onClose={() => setShowJobDetail(false)}
        sx={{ zIndex: 1300 }}
      >
        {JobDetail}
      </Drawer>
    </>
  );
}
