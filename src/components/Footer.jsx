
import '../assets/css/footer.css'
import logo from '../assets/img/baharat-logo.webp'
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Footer() {

  const navigate = useNavigate()

  

  return (

      <>
          <div className='footer-container'>
            <div className='footer-row'>
              <div className='foot-column1'>
                <div className='foot-image'>
                  <img src={logo} alt="logo" />
                </div>
                <p className='foot-tebii'>100 % təbii məhsullardan <br /> hazırlanmışdır.</p>
                <div className='foot-phone'>
                  <p><FaPhoneAlt className='phon' /></p>
                  <p> +994 10 515 51 59</p>
                </div>
                <div className='foot-location'>
                  <p><FaLocationDot className='loca' /></p>
                  <p>Azərbaycan Baku</p>
                </div>
              </div>
              <div className='foot-column2'>
                <div className='foot-category'>Kategoriyalar</div>
                <div className='foot-categories'>
                    <ul>
                      <li onClick={()=> navigate('/meyvequrusu')}><span style={{paddingRight:'3px'}}>›</span>  Meyve qurusu</li>
                      <li onClick={()=> navigate('/yaglar')}><span style={{paddingRight:'3px'}}>›</span> Tebii yaglar</li>
                      <li onClick={()=> navigate('/otlar')}><span style={{paddingRight:'3px'}}>›</span> Tebii otlar</li>
                    </ul>
                    <ul>
                      <li onClick={()=> navigate('/cerezler')}><span style={{paddingRight:'3px'}}>›</span> Cerezler</li>
                      <li onClick={()=> navigate('/baharatlar')}><span style={{paddingRight:'3px'}}>›</span> Baharatlar</li>
                      <li onClick={()=> navigate('/tortmehsullari')}><span style={{paddingRight:'3px'}}>›</span> Tort mehsullari</li>
                    </ul>
                  </div>
              </div>
              <div className='foot-column3'>
                <div className='foot-followUs-head'>Bizi Izleyin</div>
                <div className='foot-followUs'>
                  <p onClick={() => window.open('https://www.instagram.com/baharatci.az/?igsh=Y3VwZTdrdDNwODE1', '_blank')}><FaInstagram style={{fontSize:'1.5em', paddingTop:'5px'}} /></p>
                  <p onClick={() => window.open('https://www.tiktok.com/@baharatci.az?_t=8mg0HgFS6ae&_r=1', '_blank')}><FaTiktok style={{fontSize:'1.5em', paddingTop:'5px'}} /></p>
                </div>
              </div>
            </div>
          </div>
          
      </>

  )



}

export default Footer