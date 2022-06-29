import * as React from 'react';
import { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LoginIcon from '@mui/icons-material/Login'; import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AssignmentIcon from '@mui/icons-material/Assignment';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import SearchIcon from '@mui/icons-material/Search';

import Body from './Body'

import logo from '../images/logo.png'
import CardMedia from '@mui/material/CardMedia';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';


const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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


export default React.memo(function DashboardHeader(props) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        let body = document.querySelector('#root > div > div > div > div:nth-child(3)')
        // if(!open) body.style.paddingLeft = drawerWidth
        // else  body.style.paddingLeft = `10vh`
        if (open) { body.style.width = `calc(100% - 10vh)`; body.style.marginLeft = `10vh`; }
        else { body.style.width = `calc(100% - ${drawerWidth})`; body.style.marginLeft = `${drawerWidth}px`; }
        setOpen(!open);
    };

    let entryFunction = () => {
        if (localStorage.getItem('user')) {
            localStorage.clear();
            window.alert('logged out Successfully!')
            window.location.reload()
        }
        else
            props.auth()
    }
    let entryIcon = (localStorage.getItem('user')) ? <LogoutIcon /> : <LoginIcon />

    let searchName = "";
    if (props.action.name == "Add to Cart") { searchName = "Store" }
    if (props.action.name == "Remove") { searchName = "Cart" }
    if (props.action.name == "Cancell Order") { searchName = "Order history" }
    let DashboardHeaderName = searchName

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });


    return (

        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" style={{
                position: "fixed",
                top: 0
            }} open={open} >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],

                    }}
                >
                    <AutocompleteSearch items={props.items} itemLoader={props.itemLoader} searchName={searchName} />


                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav" style={{ height: "90vh" }}>
                    <React.Fragment>
                        <ListItemButton onClick={() => { props.itemLoader.loadAllItems() }}>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Store" />
                        </ListItemButton>
                        <ListItemButton onClick={() => { props.itemLoader.loadCart() }}>
                            <ListItemIcon>
                                <Badge badgeContent={props.cartCount ? props.cartCount : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItemButton >
                        <ListItemButton onClick={() => { window.location.href = '/checkout' }}>
                            <ListItemIcon>
                                <ShoppingCartCheckoutOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Check out" />
                        </ListItemButton>
                        <ListItemButton onClick={() => { props.itemLoader.loadHistory() }}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Order History" />
                        </ListItemButton>

                        <Divider />
                        <ListItemButton onClick={() => { entryFunction() }}>
                            <ListItemIcon >

                                {entryIcon}
                            </ListItemIcon>
                            <ListItemText primary={localStorage.getItem('user') ? "log out" : "Log in"} />
                        </ListItemButton>


                    </React.Fragment>

                </List>
            </Drawer>

            <AppBar style={{
                position: "fixed",
                top: 0
            }} open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '10px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>{window.innerWidth > 550 ?
                        <CardMedia style={{
                            height: "42px",
                            width: "200px",
                            paddingRight: "0.5rem"
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

                            {DashboardHeaderName}
                        </Typography>
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}></div>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{

                            ...(open && { display: 'none' }),
                        }}
                    >
                        <SearchIcon />
                    </IconButton>




                    {props.toggleElement}

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Buy me a coffee!"
                        onClick={()=>{console.log('experimental feature');razorPay()}}
                        sx={{ ml: 1 }}
                    >
                        <LocalCafeIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>


            <Body
                items={props.items} itemLoader={props.itemLoader}
                action={props.items.length > 0 ? props.items[props.items.length - 1] : props.addToCart}
                action2={props.addToCart}
                auth={() => { props.auth() }}
                loder={props.loder}
            />



        </Box>

    );
})

function razorPay(props) {
    // let orderID = document.querySelector('#orderID').value

    var options = {
        "key": "rzp_live_jNCE92u6x56mmr",
        "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Shubham Bawner",
        "description": "Buy me a coffee!",
        // "image": logo,order_JV0Apcpe0f8Vx7
        // "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        // "prefill": {
        //     "name": "Gaurav Kumar",
        //     "email": "gaurav.kumar@example.com",
        //     "contact": "9999999999"
        // },
        // "notes": {
        //     "address": "Razorpay Corporate Office"
        // },
        // "theme": {
        //     "color": "#3399cc"
        // }

    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        console.log(JSON.stringify(response))
        alert(response.error.code
        +response.error.description
        +response.error.source
        +response.error.step
        +response.error.reason
        +response.error.metadata.order_id
        +response.error.metadata.payment_id);
    });
    rzp1.on('payment.success', function (response) {
        console.log(JSON.stringify(response) + "success")
        alert(response.code
            +response.reason
            +response.order_id
            +response.payment_id);
    })
    rzp1.open();
}

function AutocompleteSearch(props) {
    // console.log(props.items, "777777777")
    let temp = []
    let temp2 = []
    let action = {}
    if (props.items && props.items.length > 1) {
        temp = [...props.items];
        temp2 = temp
        action = temp[temp.length - 1]
        temp.pop()
        let arr = []
        for (let index = 0; index < temp.length; index++) {
            const title = temp[index].title;
            if(arr.indexOf(title)===-1){
                arr.push(title)
            }
        }
        temp = arr
    }
    return (

        <Autocomplete style={{ width: "100%" }} size='small'
            disablePortal
            id="combo-box-demo"
            options={temp}
            onChange={(event, newValue) => {
                console.log(newValue, temp2);
                let temp3 = temp2.filter((i) => { return i.title.indexOf(newValue) > -1 })
                console.log(temp3);
                if(temp3.length>0)props.itemLoader.loadCustomItems([...temp3, action]);
            }}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField key={Math.random} {...params} label={`Search ${props.searchName}`} />}
        />
    );
}

/**
 * {
code: "BAD_REQUEST_ERROR"
,description: "You may have cancelled the payment or there was a delay in response from the UPI app."
,metadata:{
payment_id: "pay_JSNZejMlepuGEO"
},
reason: "payment_cancelled"
,source: "customer"
,step: "payment_authentication"
}

 * 
 */