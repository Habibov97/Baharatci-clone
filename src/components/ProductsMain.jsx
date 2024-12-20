import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


function ProductsMain({ data }) {
  const [visibleCount, setVisibleCount] = useState(14);
  const [imagePaths, setImagePaths] = useState({});
  const navigate = useNavigate();

  // Step 1: Use import.meta.glob to dynamically load images
  useEffect(() => {
    const images = import.meta.glob('/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}');

    const loadImages = async () => {
      const resolvedImages = {};
      for (const path in images) {
        const fileName = path.split('/').pop(); // Extract filename
        const module = await images[path](); // Resolve the module
        resolvedImages[fileName] = module.default; // Default export contains the image URL
      }
      setImagePaths(resolvedImages);
    };

    loadImages();
  }, []);

  const visibleData = data.flatMap((item) => item.cards).slice(0, visibleCount);
  const hasMore = visibleCount < data.flatMap((item) => item.cards).length;

  const handleMore = () => {
    setVisibleCount(visibleCount + 12);
  };

  return (
    <>
      {visibleData.map((card, i) => (
        <div key={i} className="card-product">
          <div className="card-product-img">
            {imagePaths[card.img] ? (
              <img src={imagePaths[card.img]} alt={card.name} />
            ) : (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: 'orange' }} spin />} />
            )}
          </div>
          <div className="card-product-details">
            <p>
              <b>{card.name}</b>
            </p>
            <p>{card.about}</p>
            <p>{card.price}</p>
            <button onClick={() => navigate(`/mehsul/${card.id}`)}>Ətraflı</button>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="load-more">
          <button onClick={handleMore} className="load-more-button">
            Daha çox göstər
          </button>
        </div>
      )}
    </>
  );
}

export default ProductsMain;
