import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from "js-cookie"
import swal from 'sweetalert';

export default function DeleteLed(props) {
  const { department_id, id, setChange } = props;
  const [open, setOpen] = React.useState(false);
  
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginLeft: 12, backgroundColor: "#f00", color: "#fff" }}
        variant='contained'
        onClick={handleClickOpen}>
        Delete leds
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Delete led'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button onClick={async ()=> {
            try {
                
                const res= await axios({
                    url: "https://led-mn.vercel.app/api/led-panels/"+ id,
                    method: "delete",
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                })
                const result= await res.data
                if(result) {
                    swal("Thông báo", "Delete leds success", "success")
                    .then(()=> setChange(prev=> !prev))
                    .then(()=> handleClose())
                }
                return result
            }catch(e) {
                swal("Notice", "Delete leds failed", "error")
                .then(()=> handleClose())

            }
          }} color={"#f00"} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
