import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link,useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';
import UpdateLed from '../led_by_department/UpdateLed';

export default function Leds() {
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const { id } = useParams();
  const dataGridRef = useRef(null);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/departments/'+id+'/ledpanels' , config)
      .then((response) => {
        console.log(response.data);
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    const updatedData = departmentData.filter((item) => item.id !== id);
    setDepartmentData(updatedData);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button variant={'contained'} color={'primary'}>
              <Link
                state={{ ...params.row }}
                to={'/leds/content/' + params.row.id}
                style={{ color: '#fff' }}>
                Content by Led
              </Link>
            </Button>
          </>
        );
      },
    },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 150,
    //   renderCell: (params) => (
    //     <>
    //       <Link state={params.row.id} to={'/user/' + params.row.id}>
    //         <button className='departmentListEdit'>Edit</button>
    //       </Link>
    //       <DeleteOutline
    //         className='departmentListDelete'
    //         onClick={() => handleDelete(params.row.id)}
    //       />
    //     </>
    //   ),
    // },
  ];

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
    <div className='departmentList' style={{display: "flex", flexDirection: "column"}}>
      <div style={{marginBottom: 12, fontSize: 18}}>Danh sách bảng led trong hệ thống</div>
      <DataGrid
        ref={dataGridRef}
        rows={departmentArray}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
