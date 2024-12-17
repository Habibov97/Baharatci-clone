import '../assets/css/header.css'
import Navbar from "./Navbar";
import SwiperSlider from "./SwiperSlider";
import { useLocation } from 'react-router-dom';
import HeaderInfo from "./HeaderInfo";

function Header({data}) {

  const location = useLocation();
  const showSlider = location.pathname === '/' || location.pathname === '/home';

  return (
    <div style={{maxWidth:'1920px', margin:'auto'}}>
      <div className='header-wrapper'>
        <HeaderInfo/> 
      </div>
      <Navbar data={data}/>

      {showSlider && (
        <div className='swiperSlider'>
          <SwiperSlider/>
        </div>
      )}
      
    </div>

  )
}

export default Header
