import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import swal from 'sweetalert';

export default function AddDepartment(props) {
  const { setChange } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginLeft: 12 }}
        variant='contained'
        color='primary'
        onClick={handleClickOpen}>
        Add department
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Add department'}</DialogTitle>
        <DialogContent style={{width: 400}}>
          <DialogContentText id='alert-dialog-description'>
            <TextField
              
              style={{height: 40, margin: '12px 0' }}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={'Name'}
            />
            <TextField
            fullWidth
              style={{  height: 40, margin: '12px 0' }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label='Address'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                const res = await axios({
                  url: 'https://led-mn.vercel.app/api/departments',
                  method: 'post',
                  data: {
                    name,
                    address,
                  },
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                });
                const result = await res.data;
                if (result) {
                  swal('Thông báo', 'Create department success', 'success')
                    .then(() => handleClose())
                    .then(() => setChange((prev) => !prev))
                    .then(() => {
                      setName('');
                      setAddress('');
                    });
                }
                return result;
              } catch (e) {
                swal('Notice', 'Create department failed', 'error');
              }
            }}
            color='primary'
            autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
