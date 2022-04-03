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
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        {props.item.status=="Cancelled"?<></>: <Button size="small" onClick={()=>{props.action.action(props.item)}}>{props.action.name}</Button>}
      </CardActions>
    </Card>
  );
}

