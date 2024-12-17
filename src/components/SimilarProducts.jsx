import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { closeNavDropdown } from '../slices/navbarSlice';
import { useDispatch } from 'react-redux';

function SimilarProducts({ data, product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePaths, setImagePaths] = useState({});

  // Step 1: Dynamically load images from the folder
  useEffect(() => {
    const images = import.meta.glob('/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}');

    const loadImages = async () => {
      const resolvedImages = {};
      for (const path in images) {
        const fileName = path.split('/').pop(); // Extract filename
        const module = await images[path](); // Resolve module import
        resolvedImages[fileName] = module.default; // Access image URL
      }
      setImagePaths(resolvedImages);
    };

    loadImages();
  }, []);

  // Filter products from the same category but exclude the current product
  const category = data.find((category) => category.category === product.category);
  const getProducts = category ? category.cards.filter((item) => item.id !== product.id) : [];
  const similarProducts = getProducts.slice(0, 6);

  const handleClose = (path) => {
    navigate(path);
    dispatch(closeNavDropdown());
  };

  return (
    <div className="similarProducts-container">
      <div>
        <div className="similarProducts-header">OXŞAR MƏHSULLAR</div>
      </div>

      <div className="product-cards-row">
        {similarProducts.length > 0 ? (
          similarProducts.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                {imagePaths[item.img] ? (
                  <img src={imagePaths[item.img]} alt={item.name} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
              <button onClick={() => handleClose(`/mehsul/${item.id}`)}>
                <span>
                  <IoIosSearch />
                </span>{' '}
                ətraflı
              </button>
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
