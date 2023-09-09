import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import SearchComponent from '../../components/SearchComponent';
import { AppContext } from 'src/App';
import AddUsers from './AddUser';
import DeleteUsers from './DeleteUsers';
import UpdateUser from './UpdateUser';
// import { dataUser, userRows } from '../../dummyData';
import './userList.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import swal from 'sweetalert';

export default function UserList() {
  const { priority } = useContext(AppContext);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const user = JSON.parse(Cookies.get('user'));
  // console.log(user)
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
   
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  
  useEffect(() => {
    console.log(config);
    axios
      .get('https://led-mn.vercel.app/api/users', config)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [change]);

  useEffect(() => {
    // Filter the data based on the search term whenever searchTerm or data changes
    if (!searchTerm) {
      // If the search term is empty, show all data
      setFilteredData(data);
    } else {
      // Otherwise, apply the filtering logic
      const filteredResults = data.filter((user) => {
        const userRoles = user.Roles.map((role) => role.name).join(', ');
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userRoles.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filteredResults);
    }
  }, [searchTerm, data]);



  const columns = [
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            {/* <img className='userListImg' src={params.row.avatar} alt='' /> */}
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'Roles',
      headerName: 'Role',
      flex: 1,
      renderCell: (params) => {
        // Extract role names from the 'Roles' array and join them with commas
        const roleNames = params.value.map((role) => role.name).join(', ');
        return (
          <div>
            {roleNames || 'Inactive'} {/* Display 'Block' if there are no roles */}
          </div>
        );
      },
    }
    ,
    {
      field: 'action',
      headerName: 'Action',
      flex: priority === 1 ? 2 : 0,
      renderCell: (params) => {
        return (
          <>
            {priority === 1 && (
              <>
                <UpdateUser {...params.row} setChange={setChange} />
                <DeleteUsers {...params.row} setChange={setChange} />
                <FormControl style={{ minWidth: 120, marginLeft: 12 }}>
  {/* {console.log(params.Roles.name)} */}
  <Select
    value={''} // Assuming 'Roles' is an array containing objects with a 'name' field
    onChange={(event) => handleRoleChange(event, params.row.id)}
    displayEmpty
    renderValue={(value) => value || 'change role'} // Render "Block" as default text if no role is selected
    inputProps={{ 'aria-label': 'Without label' }}
  >
    {/* Assuming 'admin', 'manager', and 'user' are valid role names */}
    <MenuItem value='1'>Admin</MenuItem>
    <MenuItem value='2'>Manager</MenuItem>
    <MenuItem value='block'>Block</MenuItem>
  </Select>
</FormControl>

              </>
            )}
          </>
        );
      },
    },
  ];

  const handleRoleChange = (event, userId) => {
    const newRole = event.target.value;
  
    // Check if the selected role is either '1' (Admin) or '2' (Manager)
    if (newRole === '1' || newRole === '2') {
      // Make an API call to changeroleapi
      const changeroleapi = `https://led-mn.vercel.app/api/users/${userId}/assign-role`;
      // Replace 'userId' in the URL with the actual user ID
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      // Perform the API call using your preferred method (e.g., fetch, axios, etc.)
      // Example using fetch:
      fetch(changeroleapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers, // Include the Authorization header
        },
        body: JSON.stringify({ roleId: newRole }),
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful API response, if needed
            swal('Notice', 'Role updated successfully', 'success');
            // Add any additional actions you want to perform after a successful update
          } else {
            // Handle API error, if needed
            swal('Error', 'Failed to update role', 'error');
            // Add any error handling logic here
          }
        })
        .catch((error) => {
          // Handle fetch error, if needed
          swal('Error', 'An error occurred while updating role', 'error');
          // Add any error handling logic here
        });
    }
  };
  

  return (
    <div className="userList">
      <div>
        {/* Use SearchComponent */}
       

        {/* AddUsers and title */}
        <div style={{ fontSize: 18, marginBottom: 12 }}>
        List of accounts on the system
        </div>
        <SearchComponent onSearch={handleSearch} />
        {priority === 1 && <AddUsers setChange={setChange} />}
      </div>
      <DataGrid
        rows={filteredData} // Use 'filteredData' to display the filtered results
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}

