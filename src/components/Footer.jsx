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
      </Link><br/>{' '}
      
      
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
        <Container  maxWidth="sm">
        <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      About Us
      </Link><br/>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Contact Us
      </Link><br/>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Privacy Policy
      </Link><br/>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Terms and Conditions
      </Link><br/>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/shubham-bawner-456131205/">
      Cancellation/Refund Policies
      </Link><br/>{' '}
        </Container>
        <div id = "razorPay" onClick={razorPay}>payments!</div>
      </Box>
    
  );
}

function razorPay(props){
  var options = {
      "key": "rzp_test_sgJ0mLdehTD2jF", 
      "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      // "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
  rzp1.open();
}
