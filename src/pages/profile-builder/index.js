import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Grid from '@mui/material/Grid';
import Start from '../../components/profile-builder/Start';
import Job from '../../components/profile-builder/Job';
import Role from '../../components/profile-builder/Role';
import Common from '../../components/profile-builder/Common';
import End from '../../components/profile-builder/End';
import ProfileHeader from '../../layout/ProfileHeader';

export default function ProfileBuilder() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
    <ProfileHeader />
    <Grid container justifyContent="center" sx={{mt: 3}}>
      <Grid item xs={10} md={6} lg={4} sx={{overflowX: 'hidden'}}>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{ width: '200%', flexGrow: 1 }}
        />
        { activeStep === 1 && 
          <Start handleNext={handleNext}/>
        }
        { activeStep === 2 && 
          <Job handleNext={handleNext}/>
        }
        { activeStep === 3 && 
          <Role handleNext={handleNext}/>
        }
        { activeStep === 4 && 
          <Common handleNext={handleNext}/>
        }
        { activeStep === 5 && 
          <End/>
        }
      </Grid>
    </Grid>
    </>
  );
}