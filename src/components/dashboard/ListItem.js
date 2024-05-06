import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";

const Items = [
  {
    path: "/dashboard-home",
    title: "Home",
    normalIcon: <HomeOutlinedIcon />,
    selectedIcon: <HomeIcon />,
  } /* 
  {
    path: "/dashboard-matches", 
    title: "Top-Matches", 
    normalIcon: <FavoriteBorderOutlinedIcon/>, 
    selectedIcon: <FavoriteIcon/>
  },*/,
  {
    path: "/dashboard-applications",
    title: "Applications",
    normalIcon: <AutoAwesomeMosaicOutlinedIcon />,
    selectedIcon: <AutoAwesomeMosaicIcon />,
  } /*
  {
    path: "/dashboard-documents", 
    title: "Documents", 
    normalIcon: <InsertDriveFileOutlinedIcon/>, 
    selectedIcon: <InsertDriveFileIcon/>
  },*/,
];

export const MainListItems = () => {
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isSelected = (path) => {
    if (path === pathname) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      {Items.map((item, index) => (
        <ListItemButton
          key={index}
          onClick={() => {
            history(item.path);
          }}
          selected={isSelected(item.path)}
        >
          <ListItemIcon>
            {isSelected(item.path) ? item.selectedIcon : item.normalIcon}
          </ListItemIcon>
          <ListItemText
            primary={isSelected(item.path) ? <b>{item.title}</b> : item.title}
          />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
