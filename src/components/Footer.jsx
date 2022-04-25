import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" style={{paddingLeft:`padding-left: calc(10vw + 16px)`,}}>
      
      <Link color="inherit" href="https://github.com/Shubhambawner">
        Github
      </Link>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
        LinkedIn
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      About Us
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Contact Us
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Privacy Policy
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Terms and Conditions
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Privacy Policy
      </Link>
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Cancellation/Refund Policies
      </Link>
      
    </Typography>
  );
}

export default function StickyFooter(props) {
  return (
    
      <Box
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        style={{paddingLeft:"calc(16px + 10vw)"}}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" style={{color: "#7d7d7d"}}>
            @ 2022 Shubham Shrikant Bawner
          </Typography>
          <Copyright />
        </Container>
      </Box>
    
  );
}