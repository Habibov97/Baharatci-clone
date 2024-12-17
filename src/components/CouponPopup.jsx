import React, { useEffect, useState } from 'react';
import '../assets/css/couponPopup.css' 
import { useNavigate } from 'react-router-dom';

const CouponPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('hasSeenPopup', 'true'); 
  };

  const handleNavigate = () => {
    setShowPopup(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
    navigate('/register')
  }

  if (!showPopup) return null;

  return (
    <div className="coupon-popup">
      <div className="coupon-popup-content">
        <h2>10% Endirim kuponu əldə et</h2>
        <p>Qaçırma! Qeydiyyatdan keçərək 10% endirim kuponu əldə edəcəksiniz! .</p>
        <button onClick={handleNavigate} className="coupon-btn">Qeydiyyat üçün tıklayın</button>
        <button onClick={handleClosePopup} className="close-btn">×</button>
      </div>
    </div>
  );
};

export default CouponPopup;
