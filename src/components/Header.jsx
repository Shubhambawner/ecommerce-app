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
    if(props.action.name=="Add to Cart")
    return(
        <div>
            <AutocompleteSearch/>
            <Button onClick={()=>{props.itemLoader.loadCart()}}>cart</Button>
            <Button onClick={()=>{props.itemLoader.loadHistory()}}>Order History</Button>
        </div>
    )
    if(props.action.name=="Remove")
    return(
        <div>
            <AutocompleteSearch/>
            <Button onClick={()=>{props.itemLoader.loadAllItems()}}>back</Button>
            <Button onClick={()=>{props.itemLoader.placeOrders()}}>check out</Button>
            <Button onClick={()=>{props.itemLoader.loadHistory()}}>Order History</Button>
        </div>
    )
    if(props.action.name=="Cancell Order")
    return(
        <div>
            <AutocompleteSearch/>
            <Button onClick={()=>{props.itemLoader.loadCart()}}>cart</Button>
            <Button onClick={()=>{props.itemLoader.loadAllItems()}}>back</Button>
        </div>
    )
}
function AutocompleteSearch() {
    const [open, setOpen] = React.useState(false);
    //   const [options, setOptions] = React.useState<readonly Film[]>([]);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(async () => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        let loadData = async () => {
            //   await sleep(1e3); // For demo purposes.

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({
            //     "email": "ayush@email.cm",
            //     "password": "SomePass5"
            // });

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                // body: raw,
                redirect: 'follow'
            };

            await fetch("https://e-commerce.urownsite.xyz/products", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (active) {
                        setOptions([...result.data]);
                    }
                })
                .catch(error => console.log('error', error));



            
        }

        await loadData();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

