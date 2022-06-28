//* currently useless

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { height } from '@mui/system';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
// interface Film {
//   title: string;
//   year: number;
// }

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }


export default React.memo(function Header(props) {
    let searchName = "";
    if(props.action.name == "Add to Cart" ) searchName = "All products"
    if(props.action.name == "Remove" ) searchName = "Cart"
    if(props.action.name == "Cancell Order" ) searchName = "History"

    let entryFunction = ()=>{
        if(localStorage.getItem('user')){
        localStorage.clear(); window.location.reload() 
    }
        else
        props.auth()
    }

    let entryName = (localStorage.getItem('user'))?"log out":"log in"
    let header = <div component={Paper} elevation={12}
        style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            padding: "1vw",
            alignItems: "center",
            justifyContent: "space-between",
            height: "10vh"
        }}>
        <AutocompleteSearch items={props.items} itemLoader={props.itemLoader} searchName = {searchName}/>
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            padding: "1vw",
            alignItems: "center",
            height: "11vh"
        }}>
        {props.action.name == "Add to Cart" ? <></>
            : <Button style={{ margin:"1vw" }} onClick={() => { props.itemLoader.loadAllItems() }}>back</Button>}
        {props.action.name == "Remove"
            ? <Button style={{ margin:"1vw" }}  variant="contained" color="success" onClick={() => { props.itemLoader.placeOrders() }}>check out</Button>
            : <Button style={{ margin:"1vw" }}  variant="contained" onClick={() => { props.itemLoader.loadCart() }}>cart</Button>}
        {props.action.name == "Cancell Order" ? <></>
            : <Button  style={{ margin:"1vw" }}  variant="outlined" onClick={() => { props.itemLoader.loadHistory() }}>Order History</Button>}
        <Button onClick={() => {entryFunction()}}>{entryName}</Button>
    </div>
    </div>
    return header

})
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
        temp = temp.map(i => i.title);
    }
    return (

        <Autocomplete style={{ width: "30%"}} size='small'
            disablePortal
            id="combo-box-demo"
            options={temp}
            onChange={(event, newValue) => {
                // console.log(newValue, temp2);
                let temp3 = temp2.filter((i) => { return i.title == newValue })
                // console.log(temp3);
                props.itemLoader.loadCustomItems([...temp3, action]);
            }}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={`Search ${props.searchName}`} />}
        />
    );
}

