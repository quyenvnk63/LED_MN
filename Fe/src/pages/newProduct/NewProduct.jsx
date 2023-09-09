import './newProduct.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function NewProduct() {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("dataUser");
  const [type, setType] = useState('')
  const [key, setKey] = useState({});
  const [file, setFile] = useState({});
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');


  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setMessage(event.target.value);
  };
  // console.log(typeof user)
  const dataUser = JSON.parse(user);
  function getFileType(file) {
    return file.type;
  }

  const config = {
    headers: { Authorization: `Bearer ${dataUser.token}` }
};
  const onImageChange = (item) => {
    // console.log('first', item.target.files)
   
    const fileType = getFileType(item.target.files[0]);
    // console.log(item.target.files[0])
    setFile(item.target.files[0])
    setType(fileType)
  }

  const handleFileImage = () => {
    // console.log('press')
    
      axios.get(`https://datn-web-led-mn.vercel.app/api/display-content/presigned-url?contentType=${type}`)
        .then((response) => {
      // console.log('11111')
      // console.log(response.data);
      // setData(response.data);
          setKey(response.data)
     
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  const handleCreate = () => {
    const jsonData = {
      "type": 1,
      "name": message,
      "path": key.key ,
    }
    axios.post('https://datn-web-led-mn.vercel.app/api/display-content/1',jsonData)
        .then((response) => {
      // console.log('11111')
      console.log(response.data);
      // setData(response.data);
          // setKey(response.data)
     
    })
    .catch((error) => {
      console.error(error);
    });;
    // console.log(jsonData.path)

  }

  const handleUpload = () => {
    axios.put(key?.url, file)
      .then((response) => {
        // console.log('11111')
        // console.log(response);
        setStatus(response.status)
        // setData(response.data);
        // setKey(response.data)
     
      })
      .catch((error) => {
        console.error(error);
      });;
  }
  useEffect(() => {
    if (type !== '') { 
      handleFileImage();
    }
  }, [type])
  
  useEffect(() => {
    if (status === 200) { 
      // console.log('sucess')
      handleCreate();
    }
  },[status])
  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Leds</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input type='file' id='file' onChange={onImageChange} />
        </div>
        <div className='addProductItem'>
          <label>Name</label>
          <input type='text' placeholder='Apple Airpods' onChange={handleChange}/>
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <input type='text' placeholder='123' />
        </div>
        <div className='addProductItem'>
          <label>Type</label>
          <select name='active' id='active' onChange={(item) => setValue(item.target.value)}>
            <option value='video'>Video</option>
            <option value='image'>Image</option>
            <option value='text'>Text</option>
          </select>
        </div>
        <Button className='addProductButton' onClick={handleUpload}>Create</Button>
      </form>
    </div>
  );
}
