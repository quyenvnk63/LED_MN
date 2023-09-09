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
import LockIcon from '@material-ui/icons/Lock';

export default function ChangePassword(props) {
  const user= JSON.parse(Cookies.get("user"))
  const [open, setOpen] = React.useState(false);
  const [password, setPassword]= React.useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen} style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: "pointer" }}>
        <div className='WindowContentIcon'>
            <LockIcon />
        </div>
        <p>Change password </p>
        </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Change password'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <TextField
              style={{ width: '400px', height: 40, margin: '12px 0' }}
              value={password}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              label={'Password'}
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
                  url: 'https://led-mn.vercel.app/api/users/'+ user.id,
                  method: 'put',
                  data: {
                    ...user, roleId: user.role_id
                  },
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                });
                const result = await res.data;
                if (result) {
                  swal('Thông báo', 'Update password success', 'success')
                    .then(() => handleClose())
                    .then(() => {
                     setPassword("")
                    });
                }
                return result;
              } catch (e) {
                swal('Notice', 'Update password failed', 'error');
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
