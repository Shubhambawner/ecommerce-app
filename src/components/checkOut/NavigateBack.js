import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';


export default React.memo(function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRedirect = () => {
    setOpen(false);
    window.location.href = '/';
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        //onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Abort purchase?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the process and return to main store ? Note that items will still be in your cart, you can remove them any time!
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleCloseRedirect}>yes, return</Button>

          <Button onClick={handleClose} autoFocus>
            No, continue check out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})