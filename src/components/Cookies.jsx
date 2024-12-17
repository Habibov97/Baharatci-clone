import { useNavigate } from 'react-router-dom';
import { BaharatContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

function Cookies() {
  const [imagePaths, setImagePaths] = useState({});
  const data = useContext(BaharatContext);
  const navigate = useNavigate();

  const filteredData = data.find((item) => item.category === 'Çərəzlər');

  useEffect(() => {
    const images = import.meta.glob(
      '/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}'
    );

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
          <h2 className="mehsul-haqqinda">Çərəzlər</h2>
        </div>
      </div>

      <div className="product-cards-container">
        <div className="product-cards-row">
          {filteredData.cards.map((item, i) => {
            return (
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
                  {' '}
                  <span>
                    <IoIosSearch />
                  </span>{' '}
                  ətraflı
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cookies;
