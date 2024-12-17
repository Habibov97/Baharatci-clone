import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaharatContext } from '../App';
import '../assets/css/pages.css'
import { FaWhatsapp } from "react-icons/fa";
import SimilarProducts from '../components/SimilarProducts';
import { useDispatch} from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

//Toaster

import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Details() {
  const { id } = useParams();
  const data = useContext(BaharatContext);
  const dispatch = useDispatch()

  const allProducts = data.flatMap(item => item.cards);
  const product = allProducts.find(item => item.id == id);


  if (!product) {
    return <div style={{width:'100%', height:'50vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <p style={{fontSize:'2em', fontFamily:'cursive', padding:'25px'}}>
            Məhsul tapılmadı.   
        </p>
        <Link to='/' style={{fontSize:'1.3em', fontFamily:'cursive',}}>Ana səhifəyə dön</Link> 
    </div>
  }

  const handleAddToBasket = ()=> {
    dispatch(addToBasket(product))
    notify()
  }
  // toast mesaji
  const notify = () => toast.success('Məhsul səbətə əlavə olundu!',{
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
    });

  return (
    <> 
      <div style={{background:'#eee'}}>
          <div className='haqqimizdaBg'>
                  <h2 className='mehsul-haqqinda'>Məhsul Haqqında</h2>   
          </div>
      </div>

      <div className="details-container">
          <div className="details-image">
            <img src={`/src/assets/img/mehsullar/${product.img}`} alt={product.name} />
          </div>
          <div className="details-content">
            <h1>{product.name}</h1>
            <p className="price">{product.price}</p>
            <ul className="details-list">
              <li>{product.about}</li>
              <li>100%  Təbii</li>
              <li>Müştərinin istəyindən asılı həcm (whatsapp)</li>
            </ul>
            <div className='order-btns'>
              <button className="whatsapp-button toBasket-btn" onClick={handleAddToBasket}>Səbətə at</button>
              <button className="whatsapp-button" onClick={() => window.open('https://wa.me/994702549600', '_blank')}>Whatsapp ilə sifariş <FaWhatsapp className='wp-icon' style={{marginLeft : '10px' ,}} /></button>
            </div>
            
          </div>
      </div>

      <SimilarProducts data={data} product={product}/>
    
    </>
    
  );
}

export default Details;
