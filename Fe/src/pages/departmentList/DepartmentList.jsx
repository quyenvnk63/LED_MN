import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';
import AddLeds from './AddLeds';
import UpdateLed from '../led_by_department/UpdateLed';
import UpdateDepartment from './UpdateDepartment';
import AddDepartment from './AddDepartment';
import DeleteDepartment from './DeleteDepartment';
import { AppContext } from 'src/App';

export default function DepartmentList() {
  const { priority } = useContext(AppContext);
  const [change, setChange]= useState()
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const user = Cookies.get('user');
  const userData = JSON.parse(user);
  const dataGridRef = useRef(null);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  useEffect(() => {
    let apiUrl;
    if (priority === 1) {
      // If the user role is 1, call the departments API
      apiUrl = 'https://led-mn.vercel.app/api/departments';
    } else {
      // Otherwise, call the departments API for the specific user
      apiUrl = `https://led-mn.vercel.app/api/users/${userData.id}/departments`;
    }
  
    axios
      .get(apiUrl, config)
      .then((response) => {
        
        let departmentDataArray;
      
        if (Array.isArray(response.data) ) {
          departmentDataArray = response.data;
        } else {
          departmentDataArray = response.data.departments;
        }
        setDepartmentData(departmentDataArray);
        
       
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
        // Handle API errors here, e.g., display an error message to the user.
        setDepartmentData([]); // Set an empty array as the default data in case of an error.
      });
  }, [change]);
  
  
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: renderStatusCell,
    },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: priority=== 1 ? 6 : 2,
      renderCell: (params) => {
        return (
          <>
            <Button variant={'contained'} color={'primary'}>
              <Link
                state={{ ...params.row }}
                to='./leds'
                style={{ color: '#fff' }}>
                Led by department
              </Link>
            </Button>
            {/* <AddLeds department_id={params.row.id} /> */}
            {
              parseInt(priority) === 1 && 
              <>
                <UpdateDepartment setChange={setChange} {...params.row} />
                <DeleteDepartment setChange={setChange} {...params.row} />
              </>
            }
          </>
        );
      },
    },
    
    // { field: 'updated_at', headerName: 'Updated At', flex: 1 },
   
  ];

  function renderStatusCell(params) {
    const status = params.value === 1 ? 'Active' : 'Inactive';
    return <span>{status}</span>;
  }

  // function renderNameCell(params) {
  //   const departmentId = params.row.id;
  //   return <Link to={`/leds/${departmentId}`}>{params.value}</Link>;
  // }

  const departmentArray = Object.values(departmentData); // Chuyển đổi object thành mảng

  return (
    <div className='departmentList' style={{flexDirection: "column", gap: 10}}>
      <div>
      <div style={{fontSize: 18, marginBottom: 12}}>List of departments of the system</div>
      {
        parseInt(priority) === 1 &&
        <AddDepartment setChange={setChange} />
      }
      </div>
      <DataGrid
        ref={dataGridRef}
        rows={departmentArray}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
