import { DataGrid } from '@material-ui/data-grid';
import { Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddContent from './AddContent';
import ViewContent from './ViewContent';
import UpdateContent from './UpdateContent';
import DeleteContent from './DeleteContent';
import SetContentForLed from './SetContentForLed';
export default function ContentByLed(props) {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(useLocation().state);
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null);
  const [change, setChange] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const handleScheduleClick = () => {
    navigate(`/leds/content/schedule/${id}`); // Navigate to EventCalendarPage
  };

  // useEffect(() => {
  //   axios
  //     .get('https://led-mn.vercel.app/api/display-content/led-panels/' + id || "", config)
  //     .then((response) => {
  //       console.log(response.data);
  //       // Generate a unique id for each row
  //       const displayContentsWithId = response.data.map((item, index) => ({
  //         id: index + 1,
  //         ...item.display_content,
  //         is_displayed: item.is_displayed,
  //       }));
  //       setDepartmentData(displayContentsWithId);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [id, change]);
  // const handleDelete = (id) => {
  //   const updatedData = departmentData.filter((item) => item.id !== id);
  //   setDepartmentData(updatedData);
  // };
  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/display-content/led-panels/' + id || "", config)
      .then((response) => {
        const sortedData = response.data
          .map((item, index) => ({
            id: index + 1,
            ...item.display_content,
            is_displayed: item.is_displayed,
          }))
          .sort((a, b) => {
            if (a.is_displayed && !b.is_displayed) {
              return -1; // Active records first
            } else if (!a.is_displayed && b.is_displayed) {
              return 1; // Inactive records after active ones
            }
            return 0; // Preserve original order for records with the same status
          });
  
        setDepartmentData(sortedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, change]);
  

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: (params) => {
      if (params.row.name?.length > 0) {
        return params.row.name;
      } else {
        return "No name";
      }
    }},
    { field: 'type', headerName: 'Type', flex: 1, renderCell: (params) => renderTypeCell(params.value) },
    // { field: 'path', headerName: 'Path', flex: 1 },
    { field: 'is_displayed', headerName: 'Active', flex: 1, renderCell: (params) => renderStatusCell(params.value) },
    {
      field: "action",
      headerName: "Action",
      flex: 4,
      renderCell: (params) => {
        return (
          <>
            <ViewContent {...params.row} />
            <UpdateContent {...params.row} setChange={setChange} />
            <DeleteContent {...params.row} setChange={setChange} />
            <SetContentForLed {...params.row} setChange={setChange} />
          </>
        );
      }
    }
  ];

  const renderTypeCell = (type) => {
    let displayType = '';
    if (type === 0) {
      displayType = 'Text';
    } else if (type === 1) {
      displayType = 'Image';
    } else if (type === 2) {
      displayType = 'Video';
    }
    return <span>{displayType}</span>;
  };

  const renderStatusCell = (isDisplayed) => {
    const status = isDisplayed ? 'Active' : 'Inactive';
    const color = isDisplayed ? 'green' : 'red'; // Apply green color if active, otherwise inherit color
  return <span style={{ color }}>{status}</span>;
  };


  const departmentArray = Object.values(departmentData); // Chuyển đổi object thành mảng

  return (
    <div className='departmentList' style={{flexDirection: "column", gap: 10}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Button
    onClick={handleScheduleClick}
    style={{ background: 'blue', color: '#fff', fontSize: '12px', padding: '4px 8px', width: '120px', height: '40px' }}
  >
    Schedule
  </Button>
  <div>
    <AddContent setChange={setChange} />
  </div>
</div>
<DataGrid ref={dataGridRef} rows={departmentArray} columns={columns} pageSize={8} />

    </div>
  );
}
