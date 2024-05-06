import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import { Divider, Box } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Status() {
  return (
    <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
            <Title>Current Status</Title>
            <Link underline='none' color="primary" href="#" onClick={preventDefault}>
                {"View all >"}
            </Link>
        </Box>
        <Divider/>
    </React.Fragment>
  );
}