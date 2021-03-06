import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from './Card'

export default React.memo(function Body(props) {
    // console.log(props.items, 'rrrrr')
    if (!props.items || props.items.length <= 1) {
        props.itemLoader.loadAllItems()
        // console.log('no items to show!')
    }
    let cards = props.items.map((item) => {
        if (item.title) {
            return (
                <Card item={item} action={props.action} action2={props.action2} key={JSON.stringify(item)}/>
            )
        } else return (<React.Fragment key={Math.random}></React.Fragment>)
    })
    cards.reverse()
    return (
        // <React.Fragment>
        //     <CssBaseline />
        //     <Container maxWidth="sm">
        //         {cards}
        //     </Container>
        // </React.Fragment>
        <div style={{display: "flex",
            // flexDirection: "row",
            
    placeContent: "center",
    background: "rgb(204 210 216)",
    width: "calc(100% - 240)",
    paddingTop: "9vh",
    flexWrap: "wrap",
    minHeight: "80vh",
    transitionDuration: "300ms",
    marginLeft:`10vh`,
    textAlign: `center`
  
            }}>
            {cards}
        </div>
    )
}

, (prevProps, nextProps) => {
    console.log(prevProps, nextProps, 'rRRRRRRRRRRRRRRRRRRRRRRRRRrrrr')
    return JSON.stringify(prevProps) == JSON.stringify(nextProps)
}
)
