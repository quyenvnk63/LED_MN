import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function ProductList() {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("dataUser");
  // console.log(typeof user)
  const dataUser = JSON.parse(user);

  const config = {
    headers: { Authorization: `Bearer ${dataUser.token}` }
};

  // const data123 = {
  //   name: ' LED 2 ',
  //   address: '1111',
  //   department_id: 1,
  //   device_code: 'ABC123',
  //   size: '10x20',
  // };
  // const data12 = JSON.stringify(data123);

  useEffect(() => {
    axios.get('https://led-mn.vercel.app/api/display-content/led-panels/1', config)
  .then((response) => {
    // console.log(response.data[0].display_content);
    console.log(response.data);
    setData(response.data);
   
  })
  .catch((error) => {
    console.error(error);
  });;

  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  // console.log('111111')

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: (params) => {
        // console.log(params.row.display_content
        //   )
        return (
          <div className='productListItem'>
            {/* <img className='productListImg' src={params.row.img} alt='' /> */}
            {params.row.display_content.name}
          </div>
        );
      },
    },
    { field: 'stock', headerName: 'Stock', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.display_content?.id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='productListDelete'
              onClick={() => handleDelete(params.row.display_content?.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
      <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        // pageSize={8}
        checkboxSelection
        getRowId={(row) => row.display_content?.id}
      />
      
    </div>
  );
}
