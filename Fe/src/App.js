import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUser } from './redux/slice/selectors';
import jwtDecode from 'jwt-decode';

import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import Department from './pages/department/department';
import DepartmentList from './pages/departmentList/DepartmentList';
import './App.css';

import Cookies from 'js-cookie';
import LedByDepartment from './pages/led_by_department/LedByDepartment';
import Leds from './pages/lesd/Leds';
import ContentByLed from './pages/contentByLeds/ContentByLeds';
import EventCalendarPage from './pages/Schedule/EventCalendarPage';

export const AppContext= createContext()
function App() {
  const [saved, setSaved] = useState();
  const [priority, setPriority]= useState()

  useEffect(() => {
    const token = Cookies.get('token');
    let tokenCheckInterval;

    if (token) {
      const isValidToken = checkTokenValidity(token);

      if (isValidToken) {
        setSaved(token);
        setPriority(JSON.parse(Cookies.get("user")).role_id)
      } else {
        setSaved(false)
        handleInvalidToken();
      }

      // Thiết lập kiểm tra lại tính hợp lệ của token sau một khoảng thời gian (ví dụ: 5 phút)
      tokenCheckInterval = setInterval(() => {
        const updatedToken = Cookies.get('token');

        if (!updatedToken || !checkTokenValidity(updatedToken)) {
          handleInvalidToken();
          clearInterval(tokenCheckInterval);
        }
      }, 30 * 60 * 1000); // 5 phút (đơn vị: mili giây)
    }
    else {
      setSaved(false)
    }

  }, []);

  // Xử lý khi token không hợp lệ
  function handleInvalidToken() {
    // Xóa token khỏi cookie và xử lý khác khi token không hợp lệ
    Cookies.remove('token');
    window.location.reload();

    // Xử lý khác khi token không hợp lệ (ví dụ: đăng xuất người dùng, chuyển hướng đến trang đăng nhập, ...)
  }

  // Hàm kiểm tra tính hợp lệ của token
  function checkTokenValidity(token) {
    try {
      // Giải mã token (đối với JWT)
      const decodedToken = jwtDecode(token);

      // Kiểm tra thời gian hết hạn
      const currentTime = Date.now() / 1000; // Thời gian hiện tại (đơn vị: giây)

      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn
        return false;
      }

      // Token hợp lệ
      return true;
    } catch (error) {
      // Lỗi giải mã token
      return false;
    }
  }
  return (
    <AppContext.Provider value={{priority}}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              (saved !== undefined && saved !== false) ? <Navigate to='/' replace /> : <Login />
            }
          />

          {saved !== undefined && saved !== false && (
            <>
              <Route
                path='/'
                element={
                  <>
                    <Topbar />
                    <div className='container'>
                      <Sidebar />
                      <Outlet />
                    </div>
                  </>
                }>
                <Route index element={<Navigate to={"/users"} replace />} />
                <Route path='users' element={<UserList />} />
                <Route path='user/:userId' element={<User />} />
                <Route path='newUser' element={<NewUser />} />
                <Route path='products' element={<ProductList />} />
                <Route path='product/:productId' element={<Product />} />
                <Route path='newproduct' element={<NewProduct />} />
                <Route path='department' element={<DepartmentList />} />
                <Route path='department/leds' element={<LedByDepartment />} />
                <Route path='department/:id' element={<Department />} />
                <Route path='leds/:id' element={<Leds />} />
                <Route path='leds/content/:id' element={<ContentByLed />} />
                <Route path='leds/content/schedule/:id' element={<EventCalendarPage />} />

              </Route>
            </>
          )}
          {saved === false && (
            <Route path='*' element={<Navigate to='/login' />} />
          )}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
