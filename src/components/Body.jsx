import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from './Card'

export default function Body(props) {
    console.log(props.items, 'rrrrr')
    if (!props.items || props.items.length <= 1) {
        props.itemLoader.loadAllItems()
        console.log('no items to show!')
    }
    let cards = props.items.map((item) => {
        if (item.title) {
            return (
                <Card item={item} action={props.action} action2={props.action2} />
            )
        } else return (<></>)
    })
    return (
        // <React.Fragment>
        //     <CssBaseline />
        //     <Container maxWidth="sm">
        //         {cards}
        //     </Container>
        // </React.Fragment>
        <div style={{display: "flex",
            // flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            background: "#d9dbff"
            }}>
            {cards}
        </div>
    )
}


