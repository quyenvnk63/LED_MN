import React, { useEffect, useState } from 'react';
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

export default function UpdateDepartment(props) {
  const { id, setChange } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setName(props.name);
    setAddress(props.address);
  }, [props]);

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
        Update department
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Update department'}</DialogTitle>
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
                  url: 'https://led-mn.vercel.app/api/departments/' + id,
                  method: 'put',
                  data: {
                    name,
                    address,
                  },
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                });
                const result = await res.data;
                if (result) {
                  swal('Thông báo', 'Update department success', 'success')
                    .then(() => setChange((prev) => !prev))
                    .then(() => handleClose())
                    .then(() => {
                      setName('');
                      setAddress('');
                    });
                }
                return result;
              } catch (e) {
                swal('Notice', 'Update department failed', 'error').then(() =>
                  handleClose(),
                );
              }
            }}
            color='primary'
            autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
