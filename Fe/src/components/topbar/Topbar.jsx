import React from 'react';
import './topbar.css';
// import { NotificationsNone, Language, Settings,AccountBoxIcon } from '@material-ui/icons';
import {
  Settings,
  AccountBox,
} from '@material-ui/icons';
import Cookies from 'js-cookie';
import LockIcon from '@material-ui/icons/Lock';
import ChangePassword from './ChangePassword';

export default function Topbar() {
  const data = Cookies.get('user');
  const userData = data ? JSON.parse(data) : undefined;
  const toggleUserWindow = () => {
    const userWindow = document.getElementById('userWindow');
    userWindow.classList.toggle('show');
  };

  const logout = () => {
    // Perform logout logic here
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.reload()
    alert('Logged out!');

  };

  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>LED MN</span>
        </div>
        <div className='topRight'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/552/552721.png'
            alt=''
            className='topAvatar'
            onClick={toggleUserWindow}
          />
        </div>
      </div>

      <div className='userWindow' id='userWindow'>
        <div className='userWindowContent'>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: "pointer" }}>
            <div className='WindowContentIcon'>
              <AccountBox />
            </div>
            <p>{userData.name} </p>
          </div>
          <ChangePassword />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: "pointer" }}>
            <div className='WindowContentIcon'>
              <Settings />
            </div>
            <p>setting</p>
          </div>
          <button className='userWindowButton' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
