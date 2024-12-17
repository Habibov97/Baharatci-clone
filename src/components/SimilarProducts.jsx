import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { closeNavDropdown, hoverNavProducts } from '../slices/navbarSlice';
import { useDispatch } from 'react-redux';

function SimilarProducts({ data, product }) {
  
const navigate = useNavigate();
const dispatch = useDispatch()

  const category = data.find(category => category.category === product.category);    
  const getProducts = category ? category.cards.filter(item => item.id !== product.id) : [];
  const similarProducts = getProducts.slice(0, 6)

    const handleClose = (path) => {
      navigate(path)
      dispatch(closeNavDropdown())
    }  


  return (
    <div className="similarProducts-container">
      <div>
        <div className='similarProducts-header'>OXŞAR MƏHSULLAR</div>
      </div>

      <div className='product-cards-row'>
        {similarProducts.length > 0 ? (
          similarProducts.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                <img src={`/src/assets/img/mehsullar/${item.img}`} alt={item.name} />
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
              <button onClick={()=> handleClose(`/mehsul/${item.id}`)}> <span><IoIosSearch /></span> ətraflı</button>
            </div>
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </div>
  );
}

export default SimilarProducts;