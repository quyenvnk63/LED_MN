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

export default function UpdateLed(props) {
  const { department_id, id, setChange } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [deviceCode, setDeviceCode] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    setName(props.name);
    setAddress(props.address);
    setDeviceCode(props.device_code);
    setSize(props.size);
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
        Update leds
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Upload Led'}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{width: 400}} id='alert-dialog-description'>
            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={'Name'}
            />
            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label='Address'
            />

            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={deviceCode}
              onChange={(e) => setDeviceCode(e.target.value)}
              label='Device Code'
            />

            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              label='Size'
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
                  url: 'https://led-mn.vercel.app/api/led-panels/' + id,
                  method: 'put',
                  data: {
                    name,
                    address,
                    department_id,
                    device_code: deviceCode,
                    size,
                  },
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                });
                const result = await res.data;
                if (result) {
                  swal('Thông báo', 'Update leds success', 'success')
                    .then(() => setChange((prev) => !prev))
                    .then(() => handleClose())
                    .then(() => {
                      setName('');
                      setSize('');
                      setAddress('');
                      setDeviceCode('');
                    });
                }
                return result;
              } catch (e) {
                swal('Notice', 'Update leds failed', 'error').then(() =>
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
