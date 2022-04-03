import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// interface Film {
//   title: string;
//   year: number;
// }

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }


export default function Header(props) {
    let header = <div>
        <AutocompleteSearch items={props.items} itemLoader={props.itemLoader} />
        {props.action.name == "Add to Cart" ? <></>
            : <Button onClick={() => { props.itemLoader.loadAllItems() }}>back</Button>}
        {props.action.name == "Remove"
            ? <Button onClick={() => { props.itemLoader.placeOrders() }}>check out</Button>
            : <Button onClick={() => { props.itemLoader.loadCart() }}>cart</Button>}
        {props.action.name == "Cancell Order" ? <></>
            : <Button onClick={() => { props.itemLoader.loadHistory() }}>Order History</Button>}
        <Button onClick={() => { localStorage.clear(); window.location.reload() }}>log out</Button>
    </div>
    return header

}
function AutocompleteSearch(props) {
    console.log(props.items, "777777777")
    let temp = []
    let temp2 = []
    if (props.items && props.items.length > 1) {
        temp = [...props.items];
        temp2 = temp
        temp.pop()
        temp = temp.map(i => i.title);
    }
    return (

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={temp}
            onChange={(event, newValue) => {
                console.log(newValue, temp2);
                let temp3 = temp2.filter((i)=>{return i.title==newValue})
                console.log(temp3);
                props.itemLoader.loadCustomItems(temp3);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search product" />}
        />
    );
}

