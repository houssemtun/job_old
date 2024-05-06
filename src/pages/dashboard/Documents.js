import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chip, Box, Button } from '@mui/material';
import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Dashboard from "./index";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Documents = () => {
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
            Your Documents
          </Typography>
          <Typography color="gray" variant="body2" gutterBottom align='left'
            sx={{ mb: 5 }}>
            Use AI to polish your resume and cover letters.
          </Typography>

          <Grid container gap={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={5} lg={5}>
              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', }}>
                <div>
                  <Chip label="Resume / CV" variant="filled" sx={{ bgcolor: "#f0e7f6", mb: 2 }} />
                </div>
                <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', 
                  width: '100%' }}>
                  <div>
                    <Typography variant="h6" fontWeight={500}>
                      Upload your CV
                    </Typography>
                    <CloudUploadOutlinedIcon fontSize="large" />
                    <br />
                    <Typography variant="body1" color="gray" gutterBottom>
                      Drag and drop your CV here. Files types are .pdf, .docx, etc
                    </Typography>
                  </div>
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', }}>
                <div>
                  <Chip label="Cover letter" variant="filled" sx={{ bgcolor: "#f0e7f6", mb: 2 }} />
                </div>
                <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', width: '100%' }}>
                  <div>
                    <Typography variant="h6" fontWeight={500}>
                      Upload Cover letter
                    </Typography>
                    <CloudUploadOutlinedIcon fontSize="large" />
                    <br />
                    <Typography variant="body1" color="gray" gutterBottom>
                      Drag and drop your CV here. Files types are .pdf, .docx, etc
                    </Typography>
                  </div>
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Dashboard>
  );
};

export default Documents;
