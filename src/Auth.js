import * as React from 'react';
import { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { handleError } from './App';
import Loder from './components/Loder'


// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

import App from './App';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    Name: props.anchorButton,
    action: props.action
  });

  let userCheck = async (user) => {
    console.log(state)
    loder.start()
    if (state.action == 'log In') {
      let result = await checkLogin(user)
      loder.stop()
      if (result == 'Success') {
        console.log('ttttttt')
        setState({ ...state, 'right': false, Name: state.Name });
      }
    }
    else {
      let result = await checkSignUp(user)
      loder.stop()
      if (result == 'Success') setState({ ...state, 'right': false, Name: state.Name });
    }
  }

  let LogInSide = () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let user = {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name')
      };
      console.log(user, "1111")
      userCheck(user);
    };

    return (

      <Grid container component="main" sx={{ height: '100vh', width: '100%' }}>
        <Grid item xs={true} sm={true} md={true} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {state.action == 'Sign Up' ? "Sign Up" : "Log In"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

              {state.action == 'Sign Up' ? <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="name"
              /> : <></>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {state.action == 'Sign Up' ? "Sign Up" : "Log In"}
              </Button>
              <Grid container>

                <Grid item>
                  <div variant="body2" style={{ cursor: "pointer", color: "blue" }} onClick={() => {
                    setState({ ...state, action: state.action != 'Sign Up' ? "Sign Up" : "Log In" })
                  }}>
                    {state.action == 'Sign Up' ? "Already have an Account? Log In" : "Don't have an account? Sign Up"}
                  </div>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>

    );
  }



  const toggleDrawer = (anchor = 'right', open, Name = state.Name, action = state.action) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open, Name: Name });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '30vw', minWidth: 250 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <LogInSide loder={loder}/>
    </Box>
  );


  // theme -------------------
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', mode === 'light' ? '#000000' : 'rgb(25, 118, 210)');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  let toggleElement =
    <IconButton style={{ position: "fix", top: 0, left: 0 }} sx={{ ml: 1 }}
      onClick={() => {
        window.alert('frequently switching modes may have some UI issues on mobile');
        colorMode.toggleColorMode()
      }}
      color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>


let loderRef = useRef(null)
let loder = {}
    loder.start = function(){
        loderRef.current.start()
    }
    loder.stop = function(){
        loderRef.current.stop()
    }

  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div>
    <Loder ref={loderRef} />


          <React.Fragment key={'right'}>
            <Drawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
          </React.Fragment>

          <App auth={() => { setState({ ...state, 'right': true, Name: state.Name }) }} toggleElement={toggleElement} />
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}


let checkLogin = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": user.email,
    "password": user.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  
  return await fetch("https://e-commercebackend.shubhambawner.repl.co/users/login", requestOptions)
    .then(response => {
      if (response.ok){
        //console.log(response.json()); 
        window.alert('login successfull')
      }
      else {
        window.alert('login failed')
        throw new Error('login failed')
      }

      return response.json()
    })
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result));
      
      return 'Success'
    })
    .catch(error =>{ console.log('error', error);handleError(error)});

}

let checkSignUp = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": user.email,
    "password": user.password,
    "name": user.name
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("https://e-commercebackend.shubhambawner.repl.co/users/signUp", requestOptions)
    .then(response =>{
      if (response.ok) window.alert('Sign Up successfull')
      else {
        window.alert('Signing Up failed')
        throw new Error('Signing Up failed')
      }
      response.json()
    })
    .then(result => {
      console.log(result, "result")
      localStorage.setItem('user', JSON.stringify(result));
      
      return 'Success'
    })
    .catch(error =>{ console.log('error', error);handleError(error)});
}
