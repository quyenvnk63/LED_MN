import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
  const [dataUser, setDataUser]= useState(JSON.parse(Cookies.get("user")))
  const [auth, setAuth]= useState()
  
  return (
    <div className='home'>
      
    </div>
  );
}
