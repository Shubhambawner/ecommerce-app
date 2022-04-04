import * as React from 'react';
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
import LoginIcon from '@mui/icons-material/Login';import LogoutIcon from '@mui/icons-material/Logout';
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



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
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

const mdTheme = createTheme();


export default function DashboardHeader(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    let entryFunction = () => {
        if (localStorage.getItem('user')) {
            localStorage.clear(); window.location.reload()
        }
        else
            props.auth()
    }
    let entryIcon = (localStorage.getItem('user'))?<LogoutIcon />:<LoginIcon />
    
    let searchName = "";
    if(props.action.name == "Add to Cart" ){ searchName = "Store"}
    if(props.action.name == "Remove" ){ searchName = "Cart"}
    if(props.action.name == "Cancell Order" ){ searchName = "Order history"}
    let DashboardHeaderName = searchName

    return (
        
            <Box sx={{ display: 'flex' }}>
                <AppBar position="absolute" open={open}>
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
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {DashboardHeaderName}
                        </Typography>
                        <IconButton color="inherit" onClick={() => {entryFunction()}}>
                            <Badge badgeContent={4} color="secondary">
                                {entryIcon}
                            </Badge>
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                            
                        }}
                    >
                                                <AutocompleteSearch items={props.items} itemLoader={props.itemLoader} searchName = {searchName}/>

                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav" style={{height: "100vh", width:300}}>
                        <React.Fragment>
                            <ListItemButton onClick={() => { props.itemLoader.loadAllItems() }}>
                                <ListItemIcon>
                                    <StoreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Store" />
                            </ListItemButton>
                            <ListItemButton onClick={() => { props.itemLoader.loadCart() }}>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cart" />
                            </ListItemButton >
                            <ListItemButton onClick={() => { props.itemLoader.placeOrders() }}>
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
                            
                        </React.Fragment>

                    </List>
                </Drawer>
                        <div >efgohuwoegisgvihoweihgoihoeriji era areeh erh</div>
            </Box>
        
    );
}

function AutocompleteSearch(props) {
    console.log(props.items, "777777777")
    let temp = []
    let temp2 = []
    let action = {}
    if (props.items && props.items.length > 1) {
        temp = [...props.items];
        temp2 = temp
        action = temp[temp.length - 1]
        temp.pop()
        temp = temp.map(i => i.title);
    }
    return (

        <Autocomplete style={{ width: "100%"}} size='small'
            disablePortal
            id="combo-box-demo"
            options={temp}
            onChange={(event, newValue) => {
                console.log(newValue, temp2);
                let temp3 = temp2.filter((i) => { return i.title == newValue })
                console.log(temp3);
                props.itemLoader.loadCustomItems([...temp3, action]);
            }}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={`Search ${props.searchName}`} />}
        />
    );
}

