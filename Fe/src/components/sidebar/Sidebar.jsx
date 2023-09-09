import React, { useState } from 'react';
import './sidebar.css';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'collapsed-c' : ''}`} style={{width: 250}}>
      <button style={{width: 80}} className={`sidebarCollapseButton  ${collapsed ? 'collapsed-1' : ''}`} onClick={toggleSidebar}>
        {/* Thêm mã icon cho nút ở đây */}
        {collapsed ? 'Expand' : 'Collapse'}
      </button>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className='sidebarWrapper'>
          <div className='sidebarMenu'>
          
            <h3 className='sidebarTitle'>Menu</h3>
            <ul className='sidebarList'>
              <Link to='/users' className={`link ${location.pathname === '/users' ? 'active' : ''}`}>
                <li className={`sidebarListItem ${location.pathname === '/users' ? 'active' : ''}`}>
                  <PermIdentity className='sidebarIcon' />
                  Users
                </li>
              </Link>
              {/* <Link to='/leds' className={`link ${location.pathname === '/leds' ? 'active' : ''}`}>
                <li className={`sidebarListItem ${location.pathname === '/leds' ? 'active' : ''}`}>
                  <Storefront className='sidebarIcon' />
                  Leds
                </li>
              </Link> */}
              <Link to='/department' className={`link ${location.pathname === '/department' ? 'active' : ''}`}>
                <li className={`sidebarListItem ${location.pathname === '/department' ? 'active' : ''}`}>
                  <AttachMoney className='sidebarIcon' />
                  Department
                </li>
              </Link>
            </ul>
          </div>
        </div>
      
      </div>
    </div>
  );
}
