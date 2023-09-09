import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useInView } from 'react-intersection-observer';
import './Viewconten.css';
const renderType = (type) => {
  if (type === 0) {
    return 'Text';
  }
  if (type === 1) {
    return 'Image';
  }
  if (type === 2) {
    return 'Video';
  }
  return 'Unknown';
};

export default function ViewContent(props) {
  const { id } = props;
  const { ref, inView } = useInView();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [text,setText] = useState(null);
  const [contentUrl, setContentUrl] = useState('');

  useEffect(() => {
    if (inView) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`https://led-mn.vercel.app/api/display-content/${id}`, {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
          });
          const result = res.data;
          // console.log(result);
          if (result) {
            setData(result);
            

          }
        } catch (e) {
          swal('Notice', 'View failed', 'error');
        }
      };
      fetchData();
    }
  }, [id, inView]);

  useEffect(() => {
    if (data) {
      if (data.type === 1 || data.type === 2) {
        const fetchContentUrl = async () => {
          try {
            const res = await axios.get(`https://led-mn.vercel.app/api/display-content/geturlContent/${data.path}`, {
              headers: { Authorization: `Bearer ${Cookies.get('token')}` },
            });
            const result = res.data;
            if (result && result.url) {
              setContentUrl(result.url);
            }
          } catch (e) {
            swal('Notice', 'Failed to fetch content URL', 'error');
          }
        };
        fetchContentUrl();
      } else {
        setText(data.path);
      }
    }
  }, [data]);
  

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
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        View content
      </Button>
      <Dialog
        ref={ref}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">View content</DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <DialogContentText id="alert-dialog-description">
            <div style={{ marginTop: 8 }}>Name</div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
              {props?.name?.length > 0 ? props.name : 'No name'}
            </div>
            <div style={{ marginTop: 8 }}>Type</div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
              {renderType(props?.type)}
            </div>
            <div style={{ marginTop: 8 }}>Content</div>
            {contentUrl ? (
  <>
    {data.type === 1 ? (
      <img className="content-image" src={contentUrl} alt="Image" />
    ) : data.type === 2 ? (
      <video className="content-video" src={contentUrl} controls />
    ) : (
      <div className="content-text">
        {data.content}
      </div>
    )}
  </>
) : (
  <div className="content-text" style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }} >
    {text}
  </div>
)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}