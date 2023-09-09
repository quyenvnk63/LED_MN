// import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Button } from '@material-ui/core'; 
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef ,useContext} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AppContext } from 'src/App';

import UpdateLed from './UpdateLed';
import DeleteLed from './DeleteLed';
import AddLeds from './AddLeds';


export default function LedByDepartment(props) {
  const { priority } = useContext(AppContext);
  const { id, name, address } = useLocation().state;
  console.log(useLocation().state);
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null);
  const [change, setChange] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/led-panels/' + id || '', config)
      .then((response) => {
        // console.log(response.data);
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, change]);

  const handleDelete = (id) => {
    const updatedData = departmentData.filter((item) => item.id !== id);
    setDepartmentData(updatedData);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
    { field: 'address', headerName: 'Address', flex: 1 },

    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <UpdateLed {...params.row} setChange={setChange} />
            <DeleteLed {...params.row} setChange={setChange} />
          </>
        );
      },
    },
   
  ];
  if (priority !== 1) {
    columns.push({
      field: 'action_content',
      headerName: 'Content by Led',
      flex: 2,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary">
            <Link
              to={`/leds/content/${params.row.id}`}
              style={{ color: '#fff' }}>
              Content by Led
            </Link>
          </Button>
        );
      },
    });
  }

  function renderStatusCell(params) {
    const status = params.value === 1 ? 'Active' : 'Inactive';
    return <span>{status}</span>;
  }

  function renderNameCell(params) {
    const departmentId = params.row.id;
    return <Link to={`/department/${departmentId}`}>{params.value}</Link>;
  }

  const departmentArray = Object.values(departmentData); // Chuyển đổi object thành mảng

  return (
    <>
      <div className='departmentList' style={{display: "flex", flex: "4", flexDirection: "column"}}>
        <div>
          <div style={{fontSize: 18, marginBottom: 12}}>List of branch's led panel {name || "_"}</div>
          <div style={{marginBottom: 12}}>Địa chỉ: {address || "_"}</div>
          <div style={{marginBottom: 12}}> { <AddLeds setChange={setChange} />} </div> 
        </div>
        <DataGrid
          ref={dataGridRef}
          rows={departmentArray}
          columns={columns}
          pageSize={8}
        />
      </div>
    </>
  );
}
