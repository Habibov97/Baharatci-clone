import { Pagination, Autoplay } from 'swiper/modules';
import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/css/sliderProducts.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { MoreSellersContext } from '../App';
import { useNavigate } from 'react-router-dom';

function MostSellers() {
    const data = useContext(MoreSellersContext);
    const navigate = useNavigate();
    const [imagePaths, setImagePaths] = useState({});

    // Dynamically load images from the folder
    useEffect(() => {
        const images = import.meta.glob('/src/assets/img/mehsullar/*.{png,jpg,jpeg,webp}');

        const loadImages = async () => {
            const resolvedImages = {};
            for (const path in images) {
                const fileName = path.split('/').pop();
                const module = await images[path]();
                resolvedImages[fileName] = module.default;
            }
            setImagePaths(resolvedImages);
        };

        loadImages();
    }, []);

    return (
        <>
            <div className="mostSeller-header">Ən çox satılanlar</div>

            <div className="mostSellers-swiper">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 1700,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        400: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 30 },
                        1024: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {data &&
                        data.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="mostSeller-product">
                                    <div className="mostSeller-img">
                                        {imagePaths[item.img] ? (
                                            <img src={imagePaths[item.img]} alt={item.name} />
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.about}</p>
                                        <p>{item.price}</p>
                                        <button onClick={() => navigate(`/mehsul/${item.id}`)}>Ətraflı</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </>
    );
}

export default MostSellers;
