import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import logo from '../../images/logo.png'
import CardMedia from '@mui/material/CardMedia';
import NavigateBack from './NavigateBack'

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm handleNext={handleNext} handleBack={handleBack}/>;
//     case 1:
//       return <PaymentForm  handleNext={handleNext} handleBack={handleBack}/>;
//     case 2:
//       return <Review  handleNext={handleNext} handleBack={handleBack}/>;
//     default:
//       throw new Error('Unknown step');
//   }
// }

const theme = createTheme();

export default function Checkout() {

  if(!localStorage.getItem('cart') ) { 
    window.alert('Your cart is empty');
  }
  if(!localStorage.getItem('user') ) { 
    window.alert('unauthorised! ');
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} handleBack={handleBack} activeStep={activeStep}/>;
      case 1:
        return <PaymentForm  handleNext={handleNext} handleBack={handleBack} activeStep={activeStep}/>;
      case 2:
        return <Review  handleNext={handleNext} handleBack={handleBack} activeStep={activeStep}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <AppBar style={{
                position: "fixed",
                top: 0,
                
            }} >
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <NavigateBack/>
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>{window.innerWidth > 450 ?
                        <CardMedia style={{
                            height: "42px",
                            width: "200px"
                        }}
                            component="img"
                            alt="logo"

                            image={logo}
                        /> : <></>}
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >

                            Check Out
                        </Typography>
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}></div>

                </Toolbar>
            </AppBar>
            
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} style={{paddingTop: "10vh"}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} style={{width: "100%", overflowX: "scroll"}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}