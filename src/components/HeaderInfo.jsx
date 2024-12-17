import '../assets/css/header.css'
import { TbTruckDelivery } from "react-icons/tb";
import { FaBorderAll, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space , Avatar } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCredentials, userToken } from "../slices/authSlice";

function HeaderInfo() {

  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const {username, token} = useSelector((state)=> state.auth)
  
  useEffect(()=> {
      getUserInfo()
  }, [])


  // Istifadecinin adinin alinmasi
  const getUserInfo = ()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.displayName = user.email.slice(0, user.email.indexOf('@'))
        dispatch(userCredentials(user.displayName))
        dispatch(userToken(user.accessToken))
      }
    })
  }

  // Cixis isleminin gorulmesi

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      dispatch(userCredentials('')); 
      dispatch(userToken(null)); 
      navigate('/login'); 
    } catch (error) {
      console.error("Sistemdən çıxılmadı", error);
    }
  };


  const handleNavigate = (path)=> {
    navigate(path)
  }


  const onClick = ({ key }) => {

    if (key === '2') {
      handleLogout();
    }
  };

  const items = [
    {
      label: 'Hesabdan çıxın',
      key: '2',
    },

  ];


  return (
    <>
        <div className={token ? 'header-wrapper-items justify-between' : 'header-wrapper-items' }>
          <div className="header-delivery-info">
            <TbTruckDelivery style={{ fontSize: "30px" }} />
            <div><b> Şəhər daxili ödənişsiz çatdırılma</b></div>
          </div>
          <div className="header-contact-info">
            <div className="header-tel" >
              <FaPhoneAlt style={{ fontSize: "20px", color: "#68B210" }} />
              <p> Tel: +994 77 777 77 77 </p>
            </div>
            <div className="header-email">
              <MdEmail style={{ fontSize: "20px", color: "#68B210"}} />
              <p> Email: info@baharatci.az </p>
            </div>
          </div>

            <div className={!token ? 'header-user-entry' : 'display-none' } >   
              <div onClick={()=> handleNavigate('/login')} className="login" role="button">Daxil ol</div>
              <div onClick={()=> handleNavigate('/register')} className="register">Qeydiyyat</div>
            </div> 
          
          <div className={!token ? 'display-none' : 'display-block'}>
            <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                <a>
                  <Space style={{cursor:'pointer'}}><Avatar style={{ backgroundColor:'#fde3cf', color: '#f56a00'}}>{username.slice(0,1).toUpperCase()}</Avatar>
                    <span style={{fontFamily:'cursive'}} >{username}</span>
                  </Space>
                </a>  
            </Dropdown>  
          </div>
        </div>
    
    </>
  )


}

export default HeaderInfo