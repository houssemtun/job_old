import * as React from 'react';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import { MainListItems } from '../components/dashboard/ListItem';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            },
        }),
        },
    }),
);

export default function SideBar({ toggleDrawer, open }) {
  return (
    <Drawer variant="permanent" sx={{position: 'relative'}} open={open}>
        <Toolbar
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
        }}
        >
        <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
        </IconButton>
        </Toolbar>
        <List component="nav">
            <MainListItems />
        </List>
        { open &&
        <AppBar position="absolute" sx={{bottom: '0px', top: 'unset'}} color="inherit">
            <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
            }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Avatar sx={{ bgcolor: 'black', width: 30, height: 30, fontSize: 20, mr: 2 }}
                        aria-label="recipe">
                        M
                    </Avatar>
                    <Box>
                        <Typography fontWeight={700}>
                            Max Müller
                        </Typography>
                        <Typography color="gray">
                            Account
                        </Typography>
                    </Box>
                </Box>
                <IconButton>
                    <MoreHorizIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        }
    </Drawer>
  );
}