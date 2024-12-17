import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ProductsMain({ data }) {
    const [visibleCount, setVisibleCount] = useState(14);
    const navigate = useNavigate();

    const images = import.meta.glob('/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}');

    // Convert imported images into an accessible object
    const imagePaths = {};
    for (const path in images) {
        const fileName = path.split('/').pop(); // Extract the file name
        imagePaths[fileName] = images[path];
    }


    const visibleData = data.flatMap(item => item.cards).slice(0, visibleCount);
    const hasMore = visibleCount < data.flatMap((item) => item.cards).length;

    const handleMore = () => {
        setVisibleCount(visibleCount + 12);
    };

    return (
      <>
          {visibleData.map((card, i) => (
                <div key={i}  className="card-product">
                  <div className='card-product-img'>
                    <img
                      src={imagePaths[card.img]}
                      alt={card.name}
                    />
                  </div>
                  <div className='card-product-details'>
                    <p> <b>{card.name}</b> </p>
                    <p>{card.about}</p>
                    <p>{card.price}</p> 
                    <button onClick={() => navigate(`/mehsul/${card.id}`)}>Ətraflı</button>
                  </div>
                </div>
          ))}
       

        {hasMore && (
          <div className='load-more'>
            <button onClick={handleMore} className="load-more-button">Daha çox göstər</button>
          </div>
        )}
      </>
    );
}

export default ProductsMain;