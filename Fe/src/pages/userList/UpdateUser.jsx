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

export default function UpdateUser(props) {
  const user= JSON.parse(Cookies.get("user"))
  const {  id, setChange } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName]= useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    setName(props.name)
    setEmail(props.address)
    setPassword(props.device_code)
  }, [props])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleClickOpen} style={{ marginLeft: 12, background: "#2dc275", color: "#fff"}}>
        Update user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Update user'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <TextField
              style={{ width: '400px', height: 40, margin: '12px 0' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={'Name'}
            />
            <TextField
              style={{ width: '400px', height: 40, margin: '12px 0' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
            />

            <TextField
              style={{ width: '400px', height: 40, margin: '12px 0' }}
              value={password}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button onClick={async ()=> {
            try {
                
                const res= await axios({
                    url: "https://led-mn.vercel.app/api/users/"+ id,
                    method: "put",
                    data: {
                        name, email, password, roleId: user.role_id
                    },
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                })
                const result= await res.data
                if(result) {
                    swal("Thông báo", "Update leds success", "success")
                    .then(()=> setChange(prev=> !prev))
                    .then(()=> handleClose())
                }
                return result
            }catch(e) {
                swal("Notice", "Update leds failed", "error")
                .then(()=> handleClose())

            }
          }} color='primary' autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
