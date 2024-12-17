import React, { useEffect, useState } from 'react';
import '../assets/css/header.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade'; // Import fade effect
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import slideImg1 from '/src/assets/img/slide1.webp';
import slideImg2 from '/src/assets/img/slide2.webp';
import slideImg3 from '/src/assets/img/slide3.webp';
import organic from '/src/assets/img/organic.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';


function SwiperSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
         AOS.init();
  }, []);

  const handleSlideChange = (swiper) => {
    setSlideIndex(swiper.realIndex);
  };
  
  return (
    <div className='swiperSlider'>
        <Swiper
          effect="fade" 
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={800}
          modules={[Pagination, Autoplay, EffectFade]} 
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide className={slideIndex === 0 ? 'zoom-in' : 'zoom-out'}>
            <img src={slideImg2} alt="SlideImg1" />
          </SwiperSlide>
          <SwiperSlide className={slideIndex === 1 ? 'zoom-out' : 'zoom-in'}>
            <img src={slideImg1} alt="SlideImg2" />
          </SwiperSlide>
          <SwiperSlide className={slideIndex === 2 ? 'zoom-in' : 'zoom-out'}>
            <img src={slideImg3} alt="SlideImg3" />
          </SwiperSlide>
        </Swiper>


        <div className='aosHeader'>
          <div className='organic' data-aos="zoom-out"  data-aos-easing="ease-out-back" data-aos-delay="500" data-aos-duration="2000" > <img src={organic} alt="Organic" /> </div>
              <div className='tebii-meh' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700" data-aos-delay="300">100% Təbii məhsul çeşidləri</div>
            <div className='beautiful-nature' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700" data-aos-delay="800">Təbiətin dərinliklərindən gələn əsrarəngiz dad.</div>
        </div>
        
        
    </div>
  );

}


export default SwiperSlider;



















































// import React, { useEffect } from 'react';
// import '../assets/css/header.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Pagination, Autoplay  } from 'swiper/modules';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import slideImg1 from '/src/assets/img/slide1.webp';
// import slideImg2 from '/src/assets/img/slide2.webp';
// import slideImg3 from '/src/assets/img/slide3.webp';
// import organic from '/src/assets/img/organic.webp';

// function SwiperSlider() {
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   return (
//     <div className='swiperSlider'>
//         <Swiper
//           pagination={false}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           speed={1800}
//           modules={[Pagination, Autoplay]}
//           className="mySwiper"
//         >
//           <SwiperSlide><img src={slideImg2} alt="SlideImg1" /> </SwiperSlide>
//           <SwiperSlide><img src={slideImg1} alt="SlideImg2" /></SwiperSlide>
//           <SwiperSlide><img src={slideImg3} alt="SlideImg3" /></SwiperSlide>
//         </Swiper>

//         <div className='aosHeader'>
//             <div className='organic' data-aos="zoom-out"  data-aos-easing="ease-out-back" data-aos-delay="500" data-aos-duration="700" > <img src={organic} alt="Organic" /> </div>
//             <div className='tebii-meh' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700" data-aos-delay="300">100% Təbii məhsul çeşidləri</div>
//             <div className='beautiful-nature' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700" data-aos-delay="800">Təbiətin dərinliklərindən gələn əsrarəngiz dad.</div>
//         </div>
//     </div>
//   )
// }

// export default SwiperSlider;
