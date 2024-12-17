import { Pagination, Autoplay } from 'swiper/modules';
import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/css/sliderProducts.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { DiscountedProductsContext } from '../App';
import { useNavigate } from 'react-router-dom';


function DiscountedProducts() {

    const data = useContext(DiscountedProductsContext);
    const navigate = useNavigate()
 
    return (
        <>
        
        <div className='discounted-header'>Endirimli məhsullar</div>

        <div className='discounted-swiper'>
            <Swiper
                slidesPerView={1} 
                spaceBetween={10}  
                loop={true}        
                autoplay={{
                    delay: 2400,  
                    disableOnInteraction: false,  
                }}
                breakpoints={{
                    400: {    
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {    
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {  
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >   
                    
                {data && data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="discounted-product">
                            <div className='discounted-img'>
                                <img src={`./src/assets/img/mehsullar/${item.img}`} alt={item.name} />
                            </div>
                            <div>
                                <p>{item.name}</p>
                                <p>{item.about}</p>
                                <p>{item.price}</p>
                                <button onClick={()=> navigate(`/mehsul/${item.id}`)}>Ətraflı</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </>
    );
}

export default DiscountedProducts;