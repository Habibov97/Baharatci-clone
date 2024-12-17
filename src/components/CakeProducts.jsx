import { useNavigate } from 'react-router-dom';
import { BaharatContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

function CakeProducts() {
  const data = useContext(BaharatContext);
  const [imagePaths, setImagePaths] = useState({});
  const navigate = useNavigate();

  // Filtered data for "Tort məhsulları"
  const filteredData = data.find((item) => item.category === 'Tort məhsulları');

  // Step 1: Dynamically load images from the folder
  useEffect(() => {
    const images = import.meta.glob('/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}');

    const loadImages = async () => {
      const resolvedImages = {};
      for (const path in images) {
        const fileName = path.split('/').pop(); // Extract filename
        const module = await images[path](); // Await module import
        resolvedImages[fileName] = module.default; // Access image URL
      }
      setImagePaths(resolvedImages);
    };

    loadImages();
  }, []);

  return (
    <>
      <div style={{ background: '#eee' }}>
        <div className="haqqimizdaBg">
          <h2 className="mehsul-haqqinda">Tort məhsulları</h2>
        </div>
      </div>

      <div className="product-cards-container">
        <div className="product-cards-row">
          {filteredData?.cards.map((item, i) => (
            <div key={i} className="product-card">
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
              <button onClick={() => navigate(`/mehsul/${item.id}`)}>
                <span>
                  <IoIosSearch />
                </span>{' '}
                ətraflı
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CakeProducts;
