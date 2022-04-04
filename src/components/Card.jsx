import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageSample from "../images/p1.png";

export default function ImgMediaCard(props) {
  console.log(props.action)

  let actionButton = (props.action.name=="Remove" || props.action.name=="Cancell Order" )
  ? <Button size="small"  color="error" onClick={()=>{props.action.action(props.item)}}>{props.action.name}</Button>
  : <Button size="small" onClick={()=>{props.action.action(props.item)}}>{props.action.name}</Button> 
  

  return (
    <Card style={{ transformOrigin: '0 0 0' }} sx={{  width: "25vw" , margin:"1.5vw", minWidth:200 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageSample}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {props.item.status=="Cancelled"
        ?<>cancelled!<Button size="small" onClick={()=>{props.action2.action(props.item)}}>{props.action2.name}</Button></>
        : actionButton}
      </CardActions>
    </Card>
  );
}

