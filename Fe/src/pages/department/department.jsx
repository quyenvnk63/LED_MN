import './department.css';
import { useState,useEffect,useRef } from 'react';
import { useParams,Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { DataGrid } from '@material-ui/data-grid';

export default function Department() {
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [ledList, setLedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataGridRef = useRef(null); 

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`https://led-mn.vercel.app/api/departments/${id}`, config);
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        const data = await response.json();
        if (data && data.department) {
          setDepartment(data.department);
        } else {
          setDepartment(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is still mounted
  
    const fetchDepartmentLed = async () => {
      try {
        const response = await fetch(`https://datn-web-led-mn.vercel.app/api/led-panels/${id}`, config);
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        const data = await response.json();
        console.log(data);
        if (isMounted) {
          // Only update the state if the component is still mounted
          if (data) {
            setLedList(data);
          } else {
            setLedList([]);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchDepartmentLed();
  
    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 , renderCell: renderNameCell },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'active', headerName: 'Status', width: 120,renderCell: renderStatusCell },
    { field: 'created_at', headerName: 'Created At', width: 160 },
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
    const status = params.value === '1' ? 'Active' : 'Inactive';
    return <span>{status}</span>;
  }

  function renderNameCell(params) {
    const departmentId = params.row.id;
    return (
      <Link to={`/department/${departmentId}`}>
        {params.value}
      </Link>
    );
  }
  



  return (
    <div className='department'>
      {isLoading && <div className="info loading">Loading...</div>}
      {!department && !isLoading && <div className="false-call-data">Failed to fetch department data.</div>}
      <h1 className='departmentTitle'>Department Detail</h1>
      <div className='departmentInfo'>
        {department && (
          <>
            <div className='departmentItem'>
              <label>Department Name:</label>
              {department.name}
            </div>
            <div className='departmentItem'>
              <label>Department Address:</label>
              <span>{department.address}</span>
            </div>
            {/* Display other department information */}
          </>
        )}
      </div>

      <div className='departmentList'>
      {ledList !== null && ledList.length > 0 ? (
    <DataGrid ref={dataGridRef} rows={ledList} columns={columns} pageSize={8} />
    ) : (
    <div>No LED panels found for this department.</div>
    )}
</div>
    </div>
  );
}
