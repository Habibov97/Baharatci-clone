import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";

function ScrollToUp() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      if (window.scrollY > 1000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <div className={`scroll-to-top ${isVisible ? 'show' : ''}`}>
        <div className="circle-container">
          <div className="rotating-circle"></div>
            <button onClick={scrollToTop} className="scroll-btn"><IoIosArrowUp /> </button>
        </div>
      </div>
    );
  }
export default ScrollToUp;