import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toggleMenu, closeMenu, toggleHamProducts, hoverNavProducts, toggleSearchBar, setSearchValue } from "../slices/navbarSlice";
import { LuShoppingCart } from "react-icons/lu";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import Loader from '../components/Loader'; 
import logo from '../assets/img/baharat-logo.webp';

function Navbar({ data }) {
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isOpen, openHamProducts, navProductsDropD, searchBarOpen, searchValue } = useSelector((state) => state.navbar);
  const {products} = useSelector((store)=> store.basket);
  const {token} = useSelector((state)=> state.auth)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { 
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);                   //Navbar pozisiyasi sticky.


  const handleNavigate = (path) => {
    navigate(path);
    dispatch(closeMenu());
    dispatch(setSearchValue(''));
  };

  const handleDropdownNavigate = (path) => {
    navigate(path);
    dispatch(closeMenu()); // menu dropdown u ayrica bagla
    dispatch(hoverNavProducts()); // ve ayrica toggle et
  };

  const handleBasketClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout'); 
    }, 1000); 
  };

  const productsInfo = data.flatMap(item => item.cards);
  const filteredProducts = productsInfo.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>

      {loading && <Loader />}



      <div className={`navbar ${isSticky ? 'sticky' : ''}`}>
        <div onClick={() => handleNavigate('/')} className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="nav-items">
          <li onClick={() => handleNavigate('/')}>Ana səhifə</li>
          <li onClick={() => handleNavigate('/haqqimizda')}>Haqqımızda</li>
          <li className="nav-mehsullar" onClick={() => dispatch(hoverNavProducts())}>
            Məhsullar <MdOutlineKeyboardArrowDown />
            <ul className={`nav-mehsullar-dropdown ${navProductsDropD ? 'hover' : ''}`}>
              <li onClick={() => handleDropdownNavigate('/baharatlar')}>Baharatlar</li>
              <li onClick={() => handleDropdownNavigate('/meyvequrusu')}>Meyvə Qurusu</li>
              <li onClick={() => handleDropdownNavigate('/cerezler')}>Çərəzlər</li>
              <li onClick={() => handleDropdownNavigate('/yaglar')}>Təbii yağlar</li>
              <li onClick={() => handleDropdownNavigate('/otlar')}>Təbii otlar</li>
              <li onClick={() => handleDropdownNavigate('/tortmehsullari')}>Tort Məhsulları</li>
            </ul>
          </li>
          <li onClick={() => handleNavigate('/blog')}>Blog</li>
          <li onClick={() => handleNavigate('/elaqe')}>Əlaqə</li>
        </ul>
        <div className="search-bar">
          <IoIosSearch className="search-icon" onClick={() => dispatch(toggleSearchBar())} style={{ marginRight: '5px' }} />  
          
          {/* Basket Icon with Badge */}
          <div className="cart-icon-container">
            <LuShoppingCart
               onClick={handleBasketClick}
              className={` cart-icon  ${products.length === 0 ? 'pointer-events-none opacity-low' : ''}`}
            
            />
            {products.length > 0 && (
              <span className="cart-badge">{products.length}</span>
            )}
          </div>

          <FaBars onClick={() => dispatch(toggleMenu())} className={` bars-icon fa-bars ${isOpen ? 'pointer-events-none' : ''}`}/>
        </div>
      </div>

      <div className={`search-container ${searchBarOpen ? 'active' : ''}`}>
        <input id="search-items" className="search-items" type="text" placeholder="Axtar" value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
        />
        {searchValue && (
          <ul className="searched-products">
            {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (
              <li key={i} onClick={() => handleNavigate(`/mehsul/${item.id}`)}>
                {item.name}
              </li>
            )) : <li>məhsul tapılmadı</li>}
          </ul>
        )}
      </div>

      <div className="hamburger">
        <div id="hamburger" className={`ham-menu ${isOpen ? 'open' : ''}`}>
          <div className="ham-logo">
            <IoMdCloseCircle onClick={() => dispatch(toggleMenu())} className="ham-close-btn" />
            <img src="/src/assets/img/baharat-logo.webp" alt="logo" />
          </div>
          <ul className="ham-nav-items">
            <div>
              <li onClick={() => handleNavigate('/')}><MdKeyboardArrowRight style={{paddingTop:'3px'}}/> Ana səhifə</li>
              <li onClick={() => handleNavigate('/haqqimizda')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Haqqımızda</li>
              <li  className="ham-nav-mehsullar" onClick={() => dispatch(toggleHamProducts())}>
              {openHamProducts  ? <MdKeyboardArrowDown style={{paddingTop:'3px'}} /> : <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> }     Məhsullar 
                <ul className={`ham-menu-products ${openHamProducts ? 'open' : ''}`}>
                  <li onClick={() => handleNavigate('/meyvequrusu')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Meyvə Qurusu</li>
                  <li onClick={() => handleNavigate('/yaglar')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Təbii yağlar</li>
                  <li onClick={() => handleNavigate('/cerezler')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Çərəzlər</li>
                  <li onClick={() => handleNavigate('/baharatlar')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Baharatlar</li>
                  <li onClick={() => handleNavigate('/tortmehsullari')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Tort Məhsulları</li>
                  <li onClick={() => handleNavigate('/otlar')} style={{ borderBottom: 'none' }}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Təbii otlar</li>
                </ul>
              </li>
              <li onClick={() => handleNavigate('/blog')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Blog</li>
              <li onClick={() => handleNavigate('/elaqe')}> <MdKeyboardArrowRight style={{paddingTop:'3px'}} /> Əlaqə</li>
            </div>
            <div className={ !token ? "ham-sign-register" : 'display-none'}>
              <div onClick={()=> handleNavigate('/login')} className="login">Daxil ol</div>
              <div onClick={()=> handleNavigate('/register')} className="register">Qeydiyyat</div>
            </div>
          </ul>      
        </div>      
      </div>
    </>
  );
}

export default Navbar;