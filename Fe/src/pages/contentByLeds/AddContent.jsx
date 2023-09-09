import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

export default function AddContent(props) {
  const { setChange } = props;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [previousType, setPreviousType] = useState(''); // Loại trước đó
  const [key, setKey] = useState({});
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(0);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (item) => {
    const selectedFile = item.target.files[0];
    if (type === 'image' && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setVideoUrl(''); // Reset videoUrl
    } else if (type === 'video' && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setPreviewUrl('');
      setVideoUrl(URL.createObjectURL(selectedFile));
    } else {
      // Invalid file type
      setFile(null);
      setPreviewUrl('');
      setVideoUrl('');
      swal('Notice', 'Invalid file type', 'error');
    }
  };

  const handleFileImage = () => {
    // Xóa file đã tải lên khi người dùng chọn lại loại
    if (file && file.name && type !== previousType) {
      setFile(null);
      setPreviewUrl('');
      setVideoUrl('');
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`https://led-mn.vercel.app/api/display-content/presigned-url?contentType=${type}`, config)
        .then((response) => {
          setKey(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const handleCreate = () => {
    const jsonData = {
      type: type === 'text' ? 0 : type === 'image' ? 1 : 2,
      name: name,
      path: type === 'text' ? content : key.key,
    };
    axios
      .post('https://led-mn.vercel.app/api/display-content/' + id, jsonData, config)
      .then((response) => {
        console.log(response.data);
        swal('Notice', 'Create content success', 'success')
          .then(() => setChange((prev) => !prev))
          .then(() => handleClose())
          .then(() => setValue(''))
          .then(() => setPreviewUrl(''))
          .then(() => setVideoUrl(''));
      })
      .catch((error) => {
        console.error(error);
        swal('Notice', 'Create content failed', 'error').then(() => handleClose());
      });
  };

  const handleUpload = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(data?.url, file)
        .then((response) => {
          setStatus(response.status);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (type !== '') {
      handleFileImage();
    }
  }, [type]);

  useEffect(() => {
    if (status === 200) {
      handleCreate();
    }
  }, [status]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === 'text') {
      handleCreate();
    } else {
    handleFileImage()
      .then((data) =>
        handleUpload(data)
          .then((data2) => console.log(data2))
          .catch((e) => console.error(e))
      )
      .catch((e) => console.error(e));
    handleClose();
    }
  };

  // Config cho axios
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  };

  return (
    <div>
      <Button color={'primary'} variant='contained' onClick={handleClickOpen}>
        Add Content
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Content</DialogTitle>
        <DialogContent>
          <Fragment>
            <TextField fullWidth label='Name' value={name} onChange={handleNameChange} required />
            <FormControl fullWidth style={{ marginBottom: 12 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setPreviousType(type); // Lưu lại loại trước đó
                  setType(event.target.value); // Cập nhật loại mới
                }}
                required
              >
                <MenuItem value='video'>Video</MenuItem>
                <MenuItem value='image'>Image</MenuItem>
                <MenuItem value='text'>Text</MenuItem>
              </Select>
            </FormControl>
            {value === 'text' ? (
              <TextField fullWidth label='Content' value={content} onChange={handleContentChange} required />
            ) : (
              <>
                {value !== '' && (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <label
                      htmlFor='file'
                      style={{
                        backgroundColor: '#2196f3',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Chọn file
                    </label>
                    <input
                      type='file'
                      id='file'
                      onChange={handleFileChange}
                      style={{ position: 'absolute', left: '-9999px' }}
                    />
                  </div>
                )}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt='Preview'
                    style={{
                      marginTop: 12,
                      maxWidth: '100%',
                      borderRadius: '4px',
                      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                )}
                {videoUrl && (
                  <video
                    src={videoUrl}
                    controls
                    style={{
                      marginTop: 12,
                      maxWidth: '100%',
                      borderRadius: '4px',
                      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                )}
              </>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
}