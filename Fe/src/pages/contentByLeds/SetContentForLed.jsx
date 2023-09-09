import React, { useState, Fragment } from 'react'; // Import React
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'; // Import Dialog components
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

export default function SetContentForLed(props) {
  const { setChange, id: contentId } = props;
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ background: 'orange', marginLeft: 12, color: '#fff' }}
        variant='contained'
        onClick={handleClickOpen}
      >
        Set content for led
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Content</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={async () => {
                try {
                  const response = await axios({
                    url: `https://led-mn.vercel.app/api/display-content/${contentId}/led-panel`,
                    method: 'post',
                    headers: {
                      Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                    data: {
                      ledPanelId: id,
                    },
                  });
                  if (response.data) {
                    swal('Notice', 'Set content for led successfully', 'success');
                    setChange(true); // Update the content list
                    handleClose(); // Close the dialog
                  }
                } catch (error) {
                  swal('Notice', 'Set content for led failed', 'error');
                }
              }}
            >
              Set content
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
